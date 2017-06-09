package com.lr.servlet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.sampled.UnsupportedAudioFileException;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FilenameUtils;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;

import com.lr.AudioConversion;
import com.lr.ConvertedTracks;
import com.lr.FileActivities;
import com.lr.Locations;
import com.lr.MD5Stuff;
import com.lr.MP3MetaData;
import com.lr.TagEditor;

@WebServlet("/FileUpload")
public class FileUpload extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public FileUpload() {
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String currentTime = Long.toString(System.currentTimeMillis());
		String userId = null;
		MP3MetaData mp3MetaData = null;
		try {
			List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
			for (FileItem item : items) {
				if (item.isFormField()) {
					String fieldName = item.getFieldName();
					String fieldValue = item.getString();
					if (fieldName.equals("userId")) {
						userId = fieldValue;
					}
				} else {
					try {
						mp3MetaData = processUploadedFile(item, currentTime);

					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}

					if (userId == null) {
						// got to fix thsi bit!
						userId = "hawkesa";
					}
					// User user = User.readUserFromDisk(userId);
					// user.addTrackId(mp3MetaData.getUniqueId());
					// user.writeUserToDisk();
				}
			}
		} catch (FileUploadException e) {
			throw new ServletException("Cannot parse multipart request.", e);
		} catch (UnsupportedAudioFileException e) {
			e.printStackTrace();
		}
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		if (mp3MetaData != null) {
			response.getWriter().write(mp3MetaData.toJSON());
		} else {
			response.getWriter().write("ERROR");
		}
	}

	private MP3MetaData processUploadedFile(FileItem item, String uniqueId)
			throws IOException, UnsupportedAudioFileException, InterruptedException {
		String ext = FilenameUtils.getExtension(item.getName());
		String filePath1 = Locations.ORIGINAL_UPLOAD + uniqueId + "." + ext;
		String originalFileName=item.getName();
		
		// Write the uploaded file to disk
		FileActivities.writeUploadedFileToDisk(item, filePath1);

		// Check the hash of the file
		MD5Stuff md5Stuff = new MD5Stuff();
		String md5Hash = null;
		try {
			md5Hash = md5Stuff.getMD5Checksum(filePath1);
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		
		
		
		MP3MetaData mp3MetaData;
		// Check if the file has been converted already
		if (ConvertedTracks.searchTrack(md5Hash) != null) {
			System.out.println("Already Converted" + ConvertedTracks.searchTrack(md5Hash));
			mp3MetaData = readMP3MetaData(ConvertedTracks.searchTrack(md5Hash), ext);
			FileActivities.deleteFile(Locations.ORIGINAL_UPLOAD + uniqueId + "." + ext);
		} else {
			FileActivities.renameFile(Locations.ORIGINAL_UPLOAD + uniqueId + "." + ext,
					Locations.ORIGINAL_UPLOAD + md5Hash + "." + ext);
			uniqueId=md5Hash;
			// Convert the file
			AudioConversion audioConversion = new AudioConversion();
			try {
				audioConversion.processFile(uniqueId, ext, Locations.RESOURCES_FOLDER);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				// e.printStackTrace();
				return null;
			}

			// Read the metadata
			mp3MetaData = readMP3MetaData(uniqueId, ext);
			mp3MetaData.setMd5Hash(md5Hash);
			mp3MetaData.setOriginalFileName(originalFileName);
			MP3MetaData.writeMP3MetaDataToDisk(mp3MetaData);
			ConvertedTracks.addTrack(md5Hash, uniqueId);
		}

		return mp3MetaData;
	}

	private MP3MetaData readMP3MetaData(String currentTime, String ext) throws IOException {
		String filePath = Locations.ORIGINAL_UPLOAD + currentTime + "." + ext;
		TagEditor tagEditor = new TagEditor();
		File file = new File(filePath);
		HashMap<String, String> allTags = null;
		try {
			allTags = tagEditor.readAllTags(file);
		} catch (CannotReadException e) {
			e.printStackTrace();
		} catch (org.jaudiotagger.tag.TagException e) {
			e.printStackTrace();
		} catch (ReadOnlyFileException e) {
			e.printStackTrace();
		} catch (InvalidAudioFrameException e) {
			e.printStackTrace();
		}
		return convert(allTags, currentTime);
	}

	private MP3MetaData convert(HashMap<String, String> allTags, String currentTime) {
		MP3MetaData mp3MetaData = new MP3MetaData();
		mp3MetaData.setAlbum(allTags.get("ALBUM"));
		mp3MetaData.setArtist(allTags.get("ARTIST"));
		mp3MetaData.setTitle(allTags.get("TITLE"));
		mp3MetaData.setUnsynchronisedLyrics(allTags.get("LYRICS"));
		mp3MetaData.setLyricRecorderSynchronisedLyrics(allTags.get("LYRICRECORDER.COM"));
		mp3MetaData.setAllTags(allTags);
		mp3MetaData.setUniqueId(currentTime);
		return mp3MetaData;
	}
}
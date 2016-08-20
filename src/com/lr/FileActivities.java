package com.lr;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.io.FilenameUtils;

public class FileActivities {
	public static void writeUploadedFileToDisk(FileItem item, String filePath) throws IOException {

		// Process form file field (input type="file").
		String fieldname = item.getFieldName();
		String filename = FilenameUtils.getName(item.getName());
		System.out.println(filename);
		InputStream inputStream = item.getInputStream();
		OutputStream os = new FileOutputStream(filePath);
		byte[] buffer = new byte[1024];
		int bytesRead;
		// read from is to buffer
		while ((bytesRead = inputStream.read(buffer)) != -1) {
			os.write(buffer, 0, bytesRead);
		}
		inputStream.close();
		// flush OutputStream to write any buffered data to file
		os.flush();
		os.close();
	}
}

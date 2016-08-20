package com.lr;

public class AudioConversionTest {

	private static final String RESOURCES_FOLDER = "H:\\Development\\lyricRecorder\\resources";

	public static void main(String[] args) throws Exception {

		System.out.println("Running AudioConversionTest");
		String sourceAudioFileName = "1470404746372";
		String sourceAudioFileExtension = "mp3";
		AudioConversion audioConversion = new AudioConversion();

		int i = 0;
		while (i < 10) {
			System.out.println("Running" + i);
			i++;
			audioConversion.processFile(sourceAudioFileName, sourceAudioFileExtension, RESOURCES_FOLDER);
		}
	}
}

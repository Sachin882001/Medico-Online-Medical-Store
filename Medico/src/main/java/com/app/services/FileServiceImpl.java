package com.app.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
@Service
public class FileServiceImpl implements FileService {

	@Override
	public String uploadImage(String path, MultipartFile file) throws IOException {
//		Extracts the original file name from the uploaded MultipartFile.
//		Generates a unique file name by appending a UUID to the file extension.
//		Constructs the file path by combining the provided path and unique file name.
//		Ensures the directory exists, creating it if necessary.
//		Copies the file content to the constructed file path.
//		Returns the unique file name for reference or further use.
		String originalFileName = file.getOriginalFilename();
		String randomId = UUID.randomUUID().toString();
		String fileName = randomId.concat(originalFileName.substring(originalFileName.lastIndexOf('.')));
		String filePath = path + File.separator + fileName;
		
		File folder = new File(path);
		if(!folder.exists()) {
			folder.mkdir();
		}
		
		Files.copy(file.getInputStream(), Paths.get(filePath));
		
		return fileName;
	}

	@Override
	public InputStream getResource(String path, String fileName) throws FileNotFoundException {
//		Constructs the full file path using the provided path and fileName.
//		Creates a FileInputStream for the file at the constructed path.
//		Returns the InputStream to allow the caller to read the file.
//		Throws a FileNotFoundException if the file does not exist.		
		String filePath = path + File.separator + fileName;
		
		InputStream inputStream = new FileInputStream(filePath);
		
		return inputStream;
	}

}

package com.guideafrica.premium.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${app.upload.dir:./uploads}")
    private String uploadDir;

    private Path uploadPath;

    private static final List<String> ALLOWED_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/webp", "image/gif"
    );

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    // Magic bytes for file type validation
    private static final byte[] JPEG_MAGIC = new byte[]{(byte) 0xFF, (byte) 0xD8, (byte) 0xFF};
    private static final byte[] PNG_MAGIC = new byte[]{(byte) 0x89, 0x50, 0x4E, 0x47};
    private static final byte[] GIF87_MAGIC = new byte[]{0x47, 0x49, 0x46, 0x38, 0x37, 0x61};
    private static final byte[] GIF89_MAGIC = new byte[]{0x47, 0x49, 0x46, 0x38, 0x39, 0x61};
    private static final byte[] WEBP_RIFF = new byte[]{0x52, 0x49, 0x46, 0x46};
    private static final byte[] WEBP_WEBP = new byte[]{0x57, 0x45, 0x42, 0x50};

    @PostConstruct
    public void init() {
        this.uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.uploadPath);
        } catch (IOException e) {
            throw new RuntimeException("Impossible de créer le répertoire d'upload: " + uploadDir, e);
        }
    }

    public String storeFile(MultipartFile file) {
        // Validate empty
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Le fichier est vide");
        }
        // Validate size
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("Le fichier dépasse la taille maximale de 5MB");
        }
        // Validate MIME type
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Type de fichier non autorisé. Formats acceptés: JPG, PNG, WebP, GIF");
        }
        // Validate magic bytes
        if (!validateMagicBytes(file)) {
            throw new IllegalArgumentException("Le contenu du fichier ne correspond pas au type déclaré");
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String filename = UUID.randomUUID().toString() + extension;

        try {
            Path targetLocation = this.uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return filename;
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors du stockage du fichier", e);
        }
    }

    private boolean validateMagicBytes(MultipartFile file) {
        try (InputStream is = file.getInputStream()) {
            byte[] header = new byte[12];
            int bytesRead = is.read(header);
            if (bytesRead < 4) {
                return false;
            }

            // Check JPEG: FF D8 FF
            if (startsWith(header, JPEG_MAGIC)) return true;
            // Check PNG: 89 50 4E 47
            if (startsWith(header, PNG_MAGIC)) return true;
            // Check GIF87a
            if (bytesRead >= 6 && startsWith(header, GIF87_MAGIC)) return true;
            // Check GIF89a
            if (bytesRead >= 6 && startsWith(header, GIF89_MAGIC)) return true;
            // Check WebP: RIFF....WEBP
            if (bytesRead >= 12 && startsWith(header, WEBP_RIFF)) {
                byte[] webpCheck = Arrays.copyOfRange(header, 8, 12);
                return Arrays.equals(webpCheck, WEBP_WEBP);
            }

            return false;
        } catch (IOException e) {
            return false;
        }
    }

    private boolean startsWith(byte[] data, byte[] prefix) {
        if (data.length < prefix.length) return false;
        for (int i = 0; i < prefix.length; i++) {
            if (data[i] != prefix[i]) return false;
        }
        return true;
    }

    public Path getFilePath(String filename) {
        Path filePath = this.uploadPath.resolve(filename).normalize();
        if (!filePath.startsWith(this.uploadPath)) {
            throw new IllegalArgumentException("Chemin de fichier non autorise");
        }
        return filePath;
    }

    public boolean fileExists(String filename) {
        Path filePath = getFilePath(filename);
        return Files.exists(filePath);
    }

    public void deleteFile(String filename) {
        try {
            Path filePath = getFilePath(filename);
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de la suppression du fichier", e);
        }
    }
}

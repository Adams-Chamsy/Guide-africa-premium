package com.guideafrica.premium.exception;

public class EmailDejaUtiliseException extends RuntimeException {
    public EmailDejaUtiliseException(String email) {
        super("Impossible de créer le compte avec les informations fournies");
    }
}

package com.socialMedia.platform.auth.exception;

public class PasswordMisMatchException extends RuntimeException {
    public PasswordMisMatchException(String message) {
        super(message);
    }
}

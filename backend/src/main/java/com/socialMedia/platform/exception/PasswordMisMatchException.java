package com.socialMedia.platform.exception;

public class PasswordMisMatchException extends RuntimeException {
    public PasswordMisMatchException(String message) {
        super(message);
    }
}

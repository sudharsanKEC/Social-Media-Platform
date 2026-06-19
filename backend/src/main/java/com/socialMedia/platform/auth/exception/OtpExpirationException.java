package com.socialMedia.platform.auth.exception;

public class OtpExpirationException extends RuntimeException {
    public OtpExpirationException(String message) {
        super(message);
    }
}

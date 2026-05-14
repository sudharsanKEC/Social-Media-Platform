package com.socialMedia.platform.exception;

public class OtpExpirationException extends RuntimeException {
    public OtpExpirationException(String message) {
        super(message);
    }
}

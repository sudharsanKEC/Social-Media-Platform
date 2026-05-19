package com.socialMedia.platform.exception;

public class InvalidPasswordLengthException extends RuntimeException {
    public InvalidPasswordLengthException(String message) {
        super(message);
    }
}

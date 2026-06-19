package com.socialMedia.platform.auth.exception;

public class EmailAlreadyVerifiedException extends RuntimeException{
    public EmailAlreadyVerifiedException(String message){
        super(message);
    }
}

package com.socialMedia.platform.exception;

public class EmailAlreadyVerifiedException extends RuntimeException{
    public EmailAlreadyVerifiedException(String message){
        super(message);
    }
}

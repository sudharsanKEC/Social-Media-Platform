package com.socialMedia.platform.exception;

public class TooManyOtpRequestsException extends RuntimeException{
    public TooManyOtpRequestsException(String message){
        super(message);
    }
}

package com.socialMedia.platform.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(InvalidOtpException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidOtpException(InvalidOtpException exception){
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", HttpStatus.BAD_REQUEST.value());
        errorResponse.put("message", exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(OtpExpirationException.class)
    public ResponseEntity<Map<String,Object>> handleOtpSessionExpiration(OtpExpirationException exception){
        Map<String, Object> responseEntity = new HashMap<>();
        responseEntity.put("timestamp",LocalDateTime.now());
        responseEntity.put("status",HttpStatus.BAD_REQUEST.value());
        responseEntity.put("message", exception.getMessage());
        return new ResponseEntity<>(responseEntity,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleEmailNotFoundException(EmailNotFoundException exception){
        Map<String, Object> responseEntity = new HashMap<>();
        responseEntity.put("timestamp", LocalDateTime.now());
        responseEntity.put("status", HttpStatus.NOT_FOUND.value());
        responseEntity.put("message", exception.getMessage());
        return new ResponseEntity<>(responseEntity, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmailAlreadyVerifiedException.class)
    public ResponseEntity<Map<String, Object>> handleEmailAlreadyVerifiedException(EmailAlreadyVerifiedException exception){
        Map<String, Object> responseEntity = new HashMap<>();
        responseEntity.put("timestamp", LocalDateTime.now());
        responseEntity.put("status", HttpStatus.CONFLICT.value());
        responseEntity.put("message", exception.getMessage());
        return new ResponseEntity<>(responseEntity, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(TooManyOtpRequestsException.class)
    public ResponseEntity<Map<String, Object>> handleEmailAlreadyVerifiedException(TooManyOtpRequestsException exception){
        Map<String, Object> responseEntity = new HashMap<>();
        responseEntity.put("timestamp", LocalDateTime.now());
        responseEntity.put("status", HttpStatus.TOO_MANY_REQUESTS.value());
        responseEntity.put("message", exception.getMessage());
        return new ResponseEntity<>(responseEntity, HttpStatus.TOO_MANY_REQUESTS);
    }


}

package com.socialMedia.platform.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(InvalidOtpException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidOtpException(InvalidOtpException exception){
        Map<String, Object> errorResponse = new LinkedHashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", HttpStatus.BAD_REQUEST.value());
        errorResponse.put("message", exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(OtpExpirationException.class)
    public ResponseEntity<Map<String,Object>> handleOtpSessionExpiration(OtpExpirationException exception){
        Map<String, Object> responseEntity = new LinkedHashMap<>();
        responseEntity.put("timestamp",LocalDateTime.now());
        responseEntity.put("status",HttpStatus.BAD_REQUEST.value());
        responseEntity.put("message", exception.getMessage());
        return new ResponseEntity<>(responseEntity,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleEmailNotFoundException(EmailNotFoundException exception){
        Map<String, Object> responseEntity = new LinkedHashMap<>();
        responseEntity.put("timestamp", LocalDateTime.now());
        responseEntity.put("status", HttpStatus.NOT_FOUND.value());
        responseEntity.put("message", exception.getMessage());
        return new ResponseEntity<>(responseEntity, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmailAlreadyVerifiedException.class)
    public ResponseEntity<Map<String, Object>> handleEmailAlreadyVerifiedException(EmailAlreadyVerifiedException exception){
        Map<String, Object> responseEntity = new LinkedHashMap<>();
        responseEntity.put("timestamp", LocalDateTime.now());
        responseEntity.put("status", HttpStatus.CONFLICT.value());
        responseEntity.put("message", exception.getMessage());
        return new ResponseEntity<>(responseEntity, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(TooManyOtpRequestsException.class)
    public ResponseEntity<Map<String, Object>> handleTooManyRequestException(TooManyOtpRequestsException exception){
        Map<String, Object> responseEntity = new LinkedHashMap<>();
        responseEntity.put("timestamp", LocalDateTime.now());
        responseEntity.put("status", HttpStatus.TOO_MANY_REQUESTS.value());
        responseEntity.put("message", exception.getMessage());
        return new ResponseEntity<>(responseEntity, HttpStatus.TOO_MANY_REQUESTS);
    }

    @ExceptionHandler(EmailNotVerifiedException.class)
    public ResponseEntity<Map<String, Object>> handleEmailNotVerifiedException(EmailNotVerifiedException exception){
        Map<String, Object> hm = new LinkedHashMap<>();
        hm.put("Timestamp",LocalDateTime.now());
        hm.put("Status",HttpStatus.FORBIDDEN.value());
        hm.put("message",exception.getMessage());
        return new ResponseEntity<>(hm,HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleUserAlreadyExistsException(UserAlreadyExistsException exception){
        Map<String, Object> hm = new LinkedHashMap<>();
        hm.put("Timestamp",LocalDateTime.now());
        hm.put("Status",HttpStatus.CONFLICT.value());
        hm.put("message",exception.getMessage());
        return new ResponseEntity<>(hm,HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserNameAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleUserNameAlreadyExistsException(UserNameAlreadyExistsException exception){
        Map<String, Object> hm = new LinkedHashMap<>();
        hm.put("Timestamp",LocalDateTime.now());
        hm.put("Status",HttpStatus.CONFLICT.value());
        hm.put("message",exception.getMessage());
        return new ResponseEntity<>(hm,HttpStatus.CONFLICT);
    }

    @ExceptionHandler(PasswordMisMatchException.class)
    public ResponseEntity<Map<String, Object>> handlePasswordDoesntMatchException(PasswordMisMatchException exception){
        Map<String, Object> hm = new LinkedHashMap<>();
        hm.put("Timestamp",LocalDateTime.now());
        hm.put("Status",HttpStatus.FORBIDDEN.value());
        hm.put("message",exception.getMessage());
        return new ResponseEntity<>(hm,HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(InvalidPasswordLengthException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidPasswordLengthException(InvalidPasswordLengthException exception){
        Map<String, Object> hm = new LinkedHashMap<>();
        hm.put("Timestamp",LocalDateTime.now());
        hm.put("Status",HttpStatus.FORBIDDEN.value());
        hm.put("message",exception.getMessage());
        return new ResponseEntity<>(hm,HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<Map<String, Object>> handlePasswordRegexMismatchException(InvalidPasswordException exception){
        Map<String, Object> hm = new LinkedHashMap<>();
        hm.put("Timestamp",LocalDateTime.now());
        hm.put("Status",HttpStatus.FORBIDDEN.value());
        hm.put("message",exception.getMessage());
        return new ResponseEntity<>(hm,HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception){
        Map<String, Object> hm = new LinkedHashMap<>();
        hm.put("timestamp",LocalDateTime.now());
        hm.put("status",HttpStatus.FORBIDDEN.value());
        Map<String, String> errors = new HashMap<>();

        exception.getBindingResult().getFieldErrors().forEach(error->{
            errors.put(error.getField(), error.getDefaultMessage());
        });
        // .getBindingResult() returns a BindingResult object, it is like a container and that holds all the validation errors.
        System.out.println("Starting1: "+exception.getBindingResult());
        System.out.println("Starting2: "+exception.getBindingResult().getFieldErrors());
        // .getFieldErrors() returns a List<FieldError> and that list was attached with a .forEach() method in which we get the errors one by one and we put that into the errors hashmap.
        hm.put("error",errors);
        return new ResponseEntity(hm,HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleUserNotFoundException(UserNotFoundException exception){
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("Timestamp",LocalDateTime.now());
        response.put("status",HttpStatus.NOT_FOUND.value());
        response.put("message",exception.getMessage());
        return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
    }
}

/*
Question:
Why not directly write the methods inside the Exception class?
Answer:
        public class UserNotFoundException extends RuntimeException {
            public ResponseEntity<String> handle() {
                return ...
            }
        }
    This is technically possible.
    BUT it violates good design principles.
    Because Exception class should only represent the ERROR
        Its job is:
            throw new UserNotFoundException("User not found");
            That’s all.
        An exception object should contain:
            error info
            message
            maybe extra metadata
        NOT:
            HTTP response logic
            controller logic
            API formatting
Seperation of concerns:
    Very important backend principle.
    | Class           | Responsibility  |
    | --------------- | --------------- |
    | Exception class | Represent error |
    | Handler class   | Decide response |
    | Controller      | Handle request  |
    | Service         | Business logic  |
Each class should have ONE responsibility.
    This is from:
        SOLID principles
        especially Single Responsibility Principle (SRP)

*/

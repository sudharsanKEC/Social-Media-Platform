package com.socialMedia.platform.controller;


import com.socialMedia.platform.dto.LoginDto;
import com.socialMedia.platform.dto.SendOtpReqDto;
import com.socialMedia.platform.dto.SignupReqDto;
import com.socialMedia.platform.dto.VerifyOtpReqDto;
import com.socialMedia.platform.service.LoginService;
import com.socialMedia.platform.service.OtpService;
import com.socialMedia.platform.service.SignupService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final OtpService otpService;
    private final SignupService signupService;
    private final LoginService loginService;
    public AuthController(OtpService otpService, SignupService signupService, LoginService loginService){
        this.otpService = otpService;
        this.signupService = signupService;
        this.loginService = loginService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String,String>> sendOtp(@Valid @RequestBody SendOtpReqDto request){
        otpService.createOrUpdateOtp(request.getEmail());
        Map<String,String> hm = new HashMap<>();
        hm.put("message","OTP sent successfully");
        return ResponseEntity.ok(hm);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, String>> verifyOtp(@Valid @RequestBody VerifyOtpReqDto request){
        String response = otpService.verifyOtp(request.getEmail(), request.getOtp());
        Map<String, String> hm = new HashMap<>();
        hm.put("message",response);
        return ResponseEntity.ok(hm);
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String,Object>> signup(@Valid @RequestBody SignupReqDto request){
        String message = signupService.createUser(request.getEmail(), request.getUsername(),request.getPassword(), request.getConfirmPassword());
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("message", message);
        response.put("status code", HttpStatus.OK.value());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginDto request){
        String userName = loginService.handleLogin(request.getEmail(), request.getPassword());
        String message = "Login Successfull";
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("message", message);
        response.put("username", userName);
        response.put("status code", HttpStatus.OK.value());
        System.out.println(ResponseEntity.ok(response));
        return ResponseEntity.ok(response);
    }
}

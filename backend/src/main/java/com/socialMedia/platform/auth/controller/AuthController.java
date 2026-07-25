package com.socialMedia.platform.auth.controller;


import com.socialMedia.platform.auth.dto.*;
import com.socialMedia.platform.security.JwtService;
import com.socialMedia.platform.auth.service.LoginService;
import com.socialMedia.platform.auth.service.OtpService;
import com.socialMedia.platform.auth.service.SignupService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final OtpService otpService;
    private final SignupService signupService;
    private final LoginService loginService;
    private final JwtService jwtService;
    public AuthController(OtpService otpService, SignupService signupService, LoginService loginService, JwtService jwtService){
        this.otpService = otpService;
        this.signupService = signupService;
        this.loginService = loginService;
        this.jwtService  = jwtService;
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
        return ResponseEntity.ok(response); // return type of .ok() method is ResponseEntity<T>, here as we passed the response hashmap to the ok() method, it will be inferred as Map<String,String>. Then the return type will eventually become ResponseEntity<Map<String, String>>
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginDto request){
        LoginResponse userDetails = loginService.handleLogin(request.getEmail(), request.getPassword());
        String message = "Login Successfull";
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("message", message);
        response.put("username", userDetails.getUserName());
        response.put("token", userDetails.getToken());
        response.put("status code", HttpStatus.OK.value());
        System.out.println(ResponseEntity.ok(response));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public String profile(){
        return "You are authenticated, this is your profile";
    }

    @GetMapping("/jwt-info")
    public String jwtInfo(){
        String token = jwtService.generateToken("kongucoder@gmail.com");
        return jwtService.extractEmail(token);
    }

}

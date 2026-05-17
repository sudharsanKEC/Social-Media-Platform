package com.socialMedia.platform.controller;


import com.socialMedia.platform.dto.SendOtpRequest;
import com.socialMedia.platform.dto.VerifyOtpRequest;
import com.socialMedia.platform.service.OtpService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final OtpService otpService;
    public AuthController(OtpService otpService){
        this.otpService = otpService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String,String>> sendOtp(@Valid @RequestBody SendOtpRequest request){
        otpService.createOrUpdateOtp(request.getEmail());
        Map<String,String> hm = new HashMap<>();
        hm.put("message","OTP sent successfully");
        return ResponseEntity.ok(hm);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, String>> verifyOtp(@Valid @RequestBody VerifyOtpRequest request){
        String response = otpService.verifyOtp(request.getEmail(), request.getOtp());
        Map<String, String> hm = new HashMap<>();
        hm.put("message",response);
        return ResponseEntity.ok(hm);
    }
}

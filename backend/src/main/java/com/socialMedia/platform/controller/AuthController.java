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

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final OtpService otpService;
    public AuthController(OtpService otpService){
        this.otpService = otpService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@Valid @RequestBody SendOtpRequest request){
        otpService.createOrUpdateOtp(request.getEmail());
        return ResponseEntity.ok("OTP generated successfully");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@Valid @RequestBody VerifyOtpRequest request){
        String response = otpService.verifyOtp(request.getEmail(), request.getOtp());
        return ResponseEntity.ok(response);
    }
}

package com.socialMedia.platform.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class VerifyOtpRequest {

    @Email(message="Invalid email")
    @NotBlank(message="Email is required")
    // @NotBlank prevents:
    //          null
    //          empty string ""
    //          only spaces " "
    String email;

    @NotBlank(message="OTP is required")
    String otp;

    public VerifyOtpRequest() {
    }

    public String getEmail() {
        return email;
    }

    public String getOtp() {
        return otp;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public VerifyOtpRequest(String email, String otp) {
        this.email = email;
        this.otp = otp;
    }
}

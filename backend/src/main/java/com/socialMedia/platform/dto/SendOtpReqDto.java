package com.socialMedia.platform.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class SendOtpReqDto {

    @Email(message="Invalid email") // If the email is not valid then this message will be displayed.
    @NotBlank(message = "Email is required")
    private String email;

    public SendOtpReqDto() {
    }

    public SendOtpReqDto(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

package com.socialMedia.platform.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;
    public EmailService(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String toEmail, String otp){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Social Media Platform - Email verification OTP");
        message.setText(
                "Your OTP for the Social Media Platform Verification is "+otp+"\n\n This OTP will expire in three minutes"
        );
        mailSender.send(message);
    }
}

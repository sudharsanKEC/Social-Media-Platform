package com.socialMedia.platform.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "otp_verifications") // creates a collection with name otp_verifications in mongo db
public class OtpVerification {

    @Id
    private String id;

    private String email;

    private String otp;

    private LocalDateTime expiryTime;

    private int resendCount;

    private boolean verified;

    private LocalDateTime blockedUntil;

    public OtpVerification(String email, String otp, LocalDateTime expiryTime, int resendCount, boolean verified) {
        this.email = email;
        this.otp = otp;
        this.expiryTime = expiryTime;
        this.resendCount = resendCount;
        this.verified = verified;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getOtp() {
        return otp;
    }

    public LocalDateTime getExpiryTime() {
        return expiryTime;
    }

    public int getResendCount() {
        return resendCount;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public void setExpiryTime(LocalDateTime expiryTime) {
        this.expiryTime = expiryTime;
    }

    public void setResendCount(int resendCount) {
        this.resendCount = resendCount;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public LocalDateTime getBlockedUntil() {
        return blockedUntil;
    }

    public void setBlockedUntil(LocalDateTime blockedUntil) {
        this.blockedUntil = blockedUntil;
    }
}

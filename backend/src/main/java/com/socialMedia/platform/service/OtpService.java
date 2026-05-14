package com.socialMedia.platform.service;

import com.socialMedia.platform.model.OtpVerification;
import com.socialMedia.platform.repository.OtpVerificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {
    private final OtpVerificationRepository otpRepository;
    private final EmailService emailService;
    // constructor injection
    public OtpService(OtpVerificationRepository otpRepository, EmailService emailService){
        this.otpRepository = otpRepository;
        this.emailService = emailService;
    }

    public String generateOtp(){
        Random random = new Random();
        int otpNumber = 100000 + random.nextInt(900000);
        // nextInt(bound) - generates numbers randomly from 0(inclusive) to 900000(exclusive), so the numbers generated in between 0 to 899999
        // adding 100000 will make it purely 6 digit, if 1 is generated then 100000 + 1 = 100001 which makes it as a full 6 digit number

        return String.valueOf(otpNumber); // converts the otpNumber from int to String
    }

    public OtpVerification createOrUpdateOtp(String email){

        String generatedOtp = generateOtp();

        Optional<OtpVerification> existingOtp = otpRepository.findByEmail(email);

        LocalDateTime now = LocalDateTime.now();

        if(existingOtp.isPresent()){

            OtpVerification otpVerification = existingOtp.get();

            if(otpVerification.getBlockedUntil() != null && now.isBefore(otpVerification.getBlockedUntil())){
                throw new RuntimeException("Too many Requests, please try again after a while");
            }

            if(otpVerification.getBlockedUntil() != null && now.isAfter(otpVerification.getBlockedUntil())){

                otpVerification.setOtp(generatedOtp);
                otpVerification.setExpiryTime(now.plusMinutes(3));
                otpVerification.setResendCount(0);
                otpVerification.setVerified(false);
                otpVerification.setBlockedUntil(null);
                OtpVerification savedOtp = otpRepository.save(otpVerification);
                emailService.sendOtpEmail(
                        email,
                        generatedOtp
                );
                return savedOtp;
            }

            if(otpVerification.getResendCount() >= 3){

                otpVerification.setBlockedUntil(
                        now.plusHours(1)
                );
                otpRepository.save(otpVerification);
                throw new RuntimeException("OTP limit reached");
            }

            otpVerification.setOtp(generatedOtp);
            otpVerification.setResendCount(
                    otpVerification.getResendCount()+1
            );
            otpVerification.setExpiryTime(now.plusMinutes(3));
            otpVerification.setVerified(false);

            OtpVerification savedOtp = otpRepository.save(otpVerification);
            emailService.sendOtpEmail(
                    email,
                    generatedOtp
            );
            return savedOtp;

        }

        OtpVerification newOtp = new OtpVerification(
                email,
                generatedOtp,
                now.plusMinutes(3),
                0,
                false
        );

        newOtp.setBlockedUntil(null);
        OtpVerification savedOtp = otpRepository.save(newOtp);
        emailService.sendOtpEmail(
                email,
                generatedOtp
        );
        return savedOtp;
    }

    public String verifyOtp(String email, String otp){

        Optional<OtpVerification> existingOtp = otpRepository.findByEmail(email);

        if(existingOtp.isEmpty()){
            throw new RuntimeException("Email not found!");
        }

        OtpVerification otpVerification = existingOtp.get();

        if(otpVerification.isVerified()){
            throw new RuntimeException("Email already verified");
        }

        if(LocalDateTime.now().isAfter(otpVerification.getExpiryTime())){
            throw new RuntimeException("OTP session expired, try generating a new OTP");
        }

        if(!otpVerification.getOtp().equals(otp)){
            throw new RuntimeException("Invalid OTP, please enter the correct OTP");
        }

        otpVerification.setVerified(true);
        otpRepository.save(otpVerification);
        return "OTP verification successfull!";
    }
}

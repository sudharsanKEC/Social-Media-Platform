package com.socialMedia.platform.service;

import com.socialMedia.platform.model.OtpVerification;
import com.socialMedia.platform.repository.OtpVerificationRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

public class OtpService {
    private OtpVerificationRepository otpRepository;

    // constructor injection
    public OtpService(OtpVerificationRepository otpRepository){
        this.otpRepository = otpRepository;
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
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(3);

        Optional<OtpVerification> existingOtp = otpRepository.findByEmail(email);

        if(existingOtp.isPresent()){

            OtpVerification otpVerification = existingOtp.get();
            if(otpVerification.getResendCount() > 2){
                throw new RuntimeException("OTP limit reached");
            }
        }

        OtpVerification newOtp = new OtpVerification(
                email,
                generatedOtp,
                expiryTime,
                0,
                false
        );
        return otpRepository.save(newOtp);
    }
}

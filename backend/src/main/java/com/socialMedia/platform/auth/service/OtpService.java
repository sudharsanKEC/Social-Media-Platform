package com.socialMedia.platform.auth.service;

import com.socialMedia.platform.auth.exception.*;
import com.socialMedia.platform.auth.model.OtpVerification;
import com.socialMedia.platform.model.User;
import com.socialMedia.platform.auth.repository.OtpVerificationRepository;
import com.socialMedia.platform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {
    private final OtpVerificationRepository otpRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;
    // constructor injection
    public OtpService(OtpVerificationRepository otpRepository, EmailService emailService, UserRepository userRepository){
        this.otpRepository = otpRepository;
        this.emailService = emailService;
        this.userRepository = userRepository;
    }

    public String generateOtp(){
        Random random = new Random();
        int otpNumber = 100000 + random.nextInt(900000);
        // nextInt(bound) - generates numbers randomly from 0(inclusive) to 900000(exclusive), so the numbers generated in between 0 to 899999
        // adding 100000 will make it purely 6 digit, if 1 is generated then 100000 + 1 = 100001 which makes it as a full 6 digit number

        return String.valueOf(otpNumber); // converts the otpNumber from int to String
    }

    public OtpVerification createOrUpdateOtp(String email){

        Optional<User> emailExists = userRepository.findByUserEmail(email);
        if(emailExists.isPresent()){
            throw new UserAlreadyExistsException("User with this email already exists, please use a new email!");
        }

        String generatedOtp = generateOtp();

        Optional<OtpVerification> existingOtp = otpRepository.findByEmail(email);

        LocalDateTime now = LocalDateTime.now();

        if(existingOtp.isPresent()){

            OtpVerification otpVerification = existingOtp.get();

            if(otpVerification.isVerified()){
                throw new EmailAlreadyVerifiedException("Entered email is already verified!");
            }

            if(otpVerification.getBlockedUntil() != null && now.isBefore(otpVerification.getBlockedUntil())){
                throw new TooManyOtpRequestsException("Too many Requests, please try again after a while");
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
                throw new TooManyOtpRequestsException("OTP limit reached");
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
            throw new EmailNotFoundException("Email not found!");
        }

        OtpVerification otpVerification = existingOtp.get();

        if(otpVerification.isVerified()){
            throw new EmailAlreadyVerifiedException("Email already verified");
        }

        if(LocalDateTime.now().isAfter(otpVerification.getExpiryTime())){
            throw new OtpExpirationException("OTP session expired, try generating a new OTP");
        }

        if(!otpVerification.getOtp().equals(otp)){
            throw new InvalidOtpException("Invalid OTP, please enter the correct OTP");
        }

        otpVerification.setVerified(true);
        otpRepository.save(otpVerification);
        return "Email verification done!";
    }
}

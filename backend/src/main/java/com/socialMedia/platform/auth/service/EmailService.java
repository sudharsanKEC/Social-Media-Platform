package com.socialMedia.platform.auth.service;

import org.springframework.mail.SimpleMailMessage; // used to send a simple mail message which includes the setTo() -> the receiver, setSubject() -> The subject for the current mail, setText() -> setting the body message for the email.
import org.springframework.mail.javamail.JavaMailSender; // this is the Spring's email sending interface and it provides methods like mailSender.send(message) to actually send emails. Internally it uses java mail and SMTP.
// both of the above SimpleMailMessage( a class) and JavaMailSender( an interface) is provided by spring and internally it uses the JavaMail API which is known was the Jakarta Mail
import org.springframework.stereotype.Service;

@Service // This tells spring: "Create an object (bean) of this class and manage it." So that we can use the object of this class to call the sendOtpEmail() method below
public class EmailService {
    private final JavaMailSender mailSender;
    public EmailService(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String toEmail, String otp){
        SimpleMailMessage message = new SimpleMailMessage(); // this creates an empty email with To:, Subject:, and Body: everything empty at initially.
        message.setTo(toEmail); // setting the recepient
        message.setSubject("Social Media Platform - Email verification OTP"); // setting the subject
        message.setText(
                "Your OTP for the Social Media Platform Verification is "+otp+"\n\n This OTP will expire in three minutes"
        ); // setting the message along with the OTP
        mailSender.send(message); // this line is an important line
        // Spring uses the SMTP settings from our configuration and then connects to the GMAIL SMTP server, Authenticates using username/password, Sends the email, Disconnects.
        // So all of that happens behind the single line mailSender.send(message)
    }
}
/*
Lets look into all the necessary email configurations written in the application.properties:

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=socialmedia.platform.team@gmail.com
spring.mail.password=app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

spring.mail.host=smtp.gmail.com:
Meaning
        The SMTP server address.
        SMTP = Simple Mail Transfer Protocol.
        Your application doesn't send emails directly to people's inboxes.
    Instead it says:
        "Hey Gmail SMTP server, please deliver this email for me."
    Here:
        smtp.gmail.com
    is Gmail's mail server.

spring.mail.port=587:
Meaning
    The port number through which your application communicates with Gmail.
    Think of:
        smtp.gmail.com
     as a building.
    And:
        587
    as a particular door of that building.
    Port 587 is the standard SMTP port for TLS-secured email sending.

When you write:
        spring.mail.host=smtp.gmail.com
        spring.mail.port=587
    you're saying:
        "Connect to the computer named smtp.gmail.com and talk through its port 587."
    Why specifically port 587?
        Because SMTP servers are configured to listen on specific ports.
    Common email ports:
        Port	Purpose
        25	    Traditional SMTP
        587	    SMTP with STARTTLS (recommended)
        465	    SMTP with SSL/TLS
        2525	Alternative SMTP
    Gmail officially supports:
        587 -> STARTTLS
        465 -> SSL/TLS
    If we use some irrelavent ports which have no relavance to SMTP then the connection will be refused or timeout will be given by the GMAIL server.




spring.mail.username=socialmedia.platform.team@gmail.com:
Meaning
    The Gmail account used to send emails.
    When users receive mail, it will appear as coming from:
        socialmedia.platform.team@gmail.com

spring.mail.password=some_password:
Meaning
    Password used to authenticate with Gmail Server.
    Gmail checks:
        Username ✓
        Password ✓
    before allowing email sending.
    In practice this is usually an App Password, not your actual Gmail password.

spring.mail.properties.mail.smtp.auth=true:
Meaning
    Enable SMTP authentication.
    This tells JavaMail:
        Don't connect anonymously.
        Login first.
    Without authentication Gmail would reject the connection.


spring.mail.properties.mail.smtp.starttls.enable=true
Meaning
        Enable TLS encryption.
        Without TLS:
            Username
            Password
            Email content
        could travel across the network in readable form.

        With TLS:
            Username
            Password
            Email content
        are encrypted before transmission.

Why are these properties in application.properties?
    Because Spring Boot automatically reads configuration from:
        application.properties
    When the application starts:
        JavaMailSender
    is automatically configured using these values.
    Internally Spring does something like:
        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        sender.setHost("smtp.gmail.com");
        sender.setPort(587);
        sender.setUsername("...");
        sender.setPassword("...");
    using the properties.
    So you don't have to write that setup code yourself.


*/
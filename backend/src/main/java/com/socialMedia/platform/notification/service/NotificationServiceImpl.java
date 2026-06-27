package com.socialMedia.platform.notification.service;

import com.socialMedia.platform.model.User;
import com.socialMedia.platform.notification.repository.NotificationRepository;
import com.socialMedia.platform.post.model.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{

    private final NotificationRepository notificationRepository;
    private final JavaMailSender javaMailSender;

    @Override
    public void sendCommentNotification(User recipient, User sender, Post post){

    }
}

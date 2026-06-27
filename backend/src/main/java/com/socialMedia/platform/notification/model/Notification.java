package com.socialMedia.platform.notification.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "Notifications")
public class Notification {
    @Id
    private String notificationId;

    private String recipientUserId;

    private String senderUserId; // the one who is responsible for triggering the notification

    private NotificationType notificationType;

    private String referenceId;

    private String title;

    private String message;

    private Boolean emailSent;

    private LocalDateTime createdAt;

    private LocalDateTime emailSentAt;
}

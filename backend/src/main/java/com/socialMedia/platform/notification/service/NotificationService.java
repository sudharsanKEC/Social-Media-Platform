package com.socialMedia.platform.notification.service;

import com.socialMedia.platform.model.User;
import com.socialMedia.platform.post.model.Post;

public interface NotificationService {
    void sendCommentNotification(User recipient, User sender, Post post);
}

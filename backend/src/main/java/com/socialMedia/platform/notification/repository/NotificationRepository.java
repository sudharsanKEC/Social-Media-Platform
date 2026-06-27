package com.socialMedia.platform.notification.repository;

import com.socialMedia.platform.notification.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NotificationRepository extends MongoRepository<Notification,String> {

}

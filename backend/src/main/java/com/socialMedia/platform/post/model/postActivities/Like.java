package com.socialMedia.platform.post.model.postActivities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "Likes")
@CompoundIndex(
        name = "user_post_unique_like",
        def = "{'userId': 1, 'postId': 1}",
        unique = true
)
/*
Why the @CompoundIndex?
        This guarantees that:
        One User + One Post = Only One Like
        Even if two requests arrive simultaneously, MongoDB won't allow duplicate likes.
*/
public class Like {
    @Id
    private String likeId;

    private String postId;

    private String userId;

    private LocalDateTime likedAt;
}

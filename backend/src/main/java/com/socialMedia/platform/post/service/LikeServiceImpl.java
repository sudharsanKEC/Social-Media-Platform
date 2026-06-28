package com.socialMedia.platform.post.service;

import com.socialMedia.platform.exception.ResourceNotFoundException;
import com.socialMedia.platform.model.User;
import com.socialMedia.platform.post.model.postActivities.Like;
import com.socialMedia.platform.post.model.post.Post;
import com.socialMedia.platform.post.repository.LikeRepository;
import com.socialMedia.platform.post.repository.PostRepository;
import com.socialMedia.platform.post.service.util.AuthenticatedUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService{

    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    private final AuthenticatedUserProvider authenticatedUserProvider;

    @Override
    public void likePost(String postId){

        Post post = postRepository.findById(postId)
                .orElseThrow(()->new ResourceNotFoundException("Post not found"));

        if(post.getIsDeleted()){
            throw new IllegalArgumentException("Cannot like a deleted post.");
        }

        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        if(likeRepository.existsByPostIdAndUserId(postId, currentUser.getUserId())){
            throw new IllegalArgumentException("You have already liked this post");
        }

        Like like = Like.builder()
                .postId(postId)
                .userId(currentUser.getUserId())
                .likedAt(LocalDateTime.now())
                .build();

        likeRepository.save(like);
        post.setLikeCount(post.getLikeCount()+1);
        postRepository.save(post);
    }

    @Override
    public void unlikePost(String postId){

        Post post = postRepository.findById(postId)
                .orElseThrow(()->new ResourceNotFoundException("Post not found."));

        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        Like like = likeRepository
                .findByPostIdAndUserId(postId, currentUser.getUserId())
                .orElseThrow(()->new IllegalArgumentException("You have not liked this post."));

        likeRepository.delete(like);

        post.setLikeCount(Math.max(0L, post.getLikeCount()-1));
        /*
            Suppose, due to a bug or inconsistent data, likeCount somehow becomes 0.
            If you simply do:
                    post.setLikeCount(post.getLikeCount() - 1);
            you'd end up with:
                    -1
            which doesn't make sense.
            Using:
                    Math.max(0L, post.getLikeCount() - 1)
            guarantees the count never becomes negative.
        */

        postRepository.save(post);
    }
}

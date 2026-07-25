package com.socialMedia.platform.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProfileRequest {
    private String description;
    private String summary;
    private String followPrivacy;
    private String profilePhotoUrl;

}
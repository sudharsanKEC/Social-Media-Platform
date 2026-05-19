package com.socialMedia.platform.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignupDTO {

    @Email(message="Invalid email")
    @NotBlank(message = "Email is required")
    private String email;
    @NotBlank(message="Password can't be blank")
    private String password;
    @NotBlank(message="Password can't be blank")
    private String confirmPassword;
    @NotBlank(message = "Username can't be blank")
    private String username;
}

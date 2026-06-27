package com.socialMedia.platform.post.service.util;

import com.socialMedia.platform.exception.ResourceNotFoundException;
import com.socialMedia.platform.model.User;
import com.socialMedia.platform.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticatedUserProvider {

    private final UserRepository userRepository;
    public AuthenticatedUserProvider(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public User getCurrentAuthenticatedUser(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // SecurityContextHolder contains the current requests security information. SecurityContextHolder -> SecurityContext -> Authentication
        // We can get the current user details, because we have already stored the authenticated user's information in JwtAuthenticationFilter using the UsernamePasswordAuthenticationToken and SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        // the .getPrincipal() will return the email. And principal will have the email in it. The type of it(principal) is object because the subject can be anything.
        String userEmail;

        if(principal instanceof User user){
            // Three things are happening in the above conditional checking:
            //      1) Checks the Type: It verifies if the principal object is an instance of the User class.
            //      2) Creates a Local Variable: If (and only if) the check is true, it automatically declares a new local variable named user of type User.
            //      3) Casts and Assigns the Value: It casts principal to User behind the scenes and assigns it to the user variable.
            // This was introduced in the java 16, it is called Pattern Matching for instanceof, it combines type checking and type casting into a single line. Before the introduction of this, the older way was liek:
            /*
                    if (principal instanceof User) {
                        User user = (User) principal; // Tedious explicit casting
                    }


            */

            userEmail = user.getUserEmail();
        } else if(principal instanceof String email){
            // Again pattern match making
            // Equivalent to:
            /*
                else if(principal instanceof String){
                    String email = (String) principal;
                }


            */
            userEmail = email;
        } else{
            throw new RuntimeException("Unable to identify authenticated user"); // if the current user is not have proper jwt, this error will be thrown.
        }

        return userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));
    }
}

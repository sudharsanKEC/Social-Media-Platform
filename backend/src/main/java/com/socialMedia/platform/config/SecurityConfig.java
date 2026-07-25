package com.socialMedia.platform.config;

import com.socialMedia.platform.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration // This annotation is used to say that the below class is going to have a configuration settings in it.
@EnableWebSecurity // This tells spring to activate the Spring Security's web security features.
// the below class is used to enforce some security rules that should be applied before the incoming requests reach the application's controller
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter){
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }
    @Bean
    // Spring will pass the http object for the below parameter.
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        /*
            What is SecurityFilterChain?
                Its in of the most important concept.
                In spring, in general, a filter intercepts the incoming requests to the backend before it reaches the controller.
                Request -> Filter -> Controller
                Spring Security has a lot of filters like: Authentication Filter, Authorization Filter, CSRF Filter, Logout Filter, Session Filter.

                Then what is a filter chain:
                    A filter chain is the chain of collection of the Security filters one by one like:
                    Request -> Filter1 -> Filter2 -> Filter3 -> Controller
                    Each filters in the chain performs some security related tasks.

                 What is SecurityFilterChain then?
                    It is simply:
                           A configuration that tells Spring Security which filters to use and how they should behave.
                           Example:
                                @Bean
                                public SecurityFilterChain securityFilterChain(...)
                            returns the complete security configuration.
                So we can manually customize those filters in the SecurityFilterChain and thats what this configuration class is for.
        */
        return http
                .cors(cors->{}) // this line made the spring security to respect CorsConfig file.
                .csrf(csrf->csrf.disable())

                .authorizeHttpRequests(auth->auth
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/posts").permitAll()
                        .requestMatchers(
                                "/api/auth/send-otp",
                                "/api/auth/verify-otp",
                                "/api/auth/signup",
                                "/api/auth/login",
                                "/api/auth/get-jwt",
                                "/api/auth/jwt-info",

                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html",
                                "/uploads/**"
                                ) // --> Accepts any requests like: /signup, /login, /posts, /users etc...
                                .permitAll() // --> Allow access to everyone without authentication.

                                .anyRequest()
                                .authenticated()
                )
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                )
                .build(); // this line is like saying save all the configurations done above.
        /*
            HttpSecurity is a builder object.
            It is like a security settings builder
            It lets to configure us: Authentication, Authorization, CSRF, JWT, Sessions, Login page, Logout.




        */
    }
}
/*

In Spring Boot 3+
    When you define a:
        @Bean
        SecurityFilterChain
    Spring Boot usually auto-detects it.
    So nowadays:
        @Configuration
        public class SecurityConfig {
        }
    often works even without:
        @EnableWebSecurity
    But many developers still keep it because it makes the purpose explicit.


*/
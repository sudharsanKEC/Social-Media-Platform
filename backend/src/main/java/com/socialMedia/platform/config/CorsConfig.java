package com.socialMedia.platform.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // this annotation says that the below class contains the configuration information and bean definitions
// Most of the @Configuration registered classes will be processed during the application startup.
// Whenever we are writing some code which was related to configuration, we should add the @Configuration
// the below class name can be anything, but good to keep it relevant.
public class CorsConfig {

    @Bean // saying the Spring to manage the object in spring container, returned from this below method.
    // this annotation says the spring: Execute this method and store the returned object as a bean in the Spring Container.
    // the below method will be executed during the startup of the application
    public WebMvcConfigurer corsConfigurer(){
        // Implementing the WebMvcConfigurer with an anonymous class below.
        return new WebMvcConfigurer() {
            @Override
            // this method will be called automatically during the application startup. Then the CORS rules defined in the below method will be applied accordingly.
            // During MVC initialization, the spring mvc knows that the below method exists and executes it and from which the CORS configuration will be applied.
            // The object for the below registry will be passed by spring itself.
            public void addCorsMappings(CorsRegistry registry) {
                // CorsRegistry is a helper class used to store CORS rules.
                // using this methods object we can register: allowed origins, methods, headers and credentials
                registry.addMapping("/**") // "/**" means every endpoint, which means apply the below rules to every endpoint of the application, this line returns CorsRegistration for the next method call.
                        .allowedOrigins("http://localhost:5173") // every request from this origin will be allowed and will not be blocked, we can allow multiple origin which can be seperated using comma(,).
                        .allowedMethods("*") // every methods like GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD will be accepted
                        .allowedHeaders("*"); // All these types of headers will be allowed: Content-Type, Authorization, Accept, X-Custom-Header.
                        // Suppose react sends:
                        /*
                            fetch(url,{
                                  headers:{
                                    "Authorization":"Bearer xyz"
                                    }
                                })

                            The browser first checks whether that header is permitted.
                            Your config says:
                                       .allowedHeaders("*")
                            Meaning:
                                     Any header is acceptable.
                        */

            }
        };
        /*
            The above interface implementation by the anonymous class is similar to:
            class MyConfigurer implements WebMvcConfigurer {
                ...
            }

            @Bean
            public WebMvcConfigurer corsConfigurer() {
                return new MyConfigurer();
            }

            But our approach of implementing using anonymous class is more shorter and convinient than the class with name.
        */

    }

}

/*
Note:
    WebMvcConfigurer is the contract: "I can customize Spring MVC"
    CorsRegistry is the tool and it is used to define CORS rules.
    Similarly: WebMvcConfigurer is the customizer. CorsRegistry is the thing being customized.
*/

/*

Spring MVC
    |
    |---- already implemented by Spring developers
    |
    |---- allows customization through WebMvcConfigurer --> So we can do customizations using the contracts from the interface WebMvcConfigurer

Spring MVC
     |
     |---- default configuration
     |
     |---- applies your customizations
     |
     |---- final configuration
*/

/*

You asked:
    If browsers enforce CORS, why do we configure CORS in the server?
Excellent question.
    Because the browser needs permission from the server.
    Imagine:
        React
        localhost:5173

        Spring
        localhost:8080

    Browser sends:
        GET /users
        Origin: http://localhost:5173

        Notice this header:
            Origin: http://localhost:5173
        The browser automatically adds it.
        Now the server receives:
            Request came from localhost:5173
        The server must decide:
            Do I allow this origin?
        If yes, Spring adds:
            Access-Control-Allow-Origin: http://localhost:5173
            to the response.
        Response:
            HTTP/1.1 200 OK
            Access-Control-Allow-Origin: http://localhost:5173
            Browser reads that header and says:
                Okay, server gave permission.
            I will expose the response to JavaScript.
            If the header is missing:
                HTTP/1.1 200 OK
            Browser says:
                No permission.
                Block access.
                Important realization
            The server isn't enforcing CORS.
            The server is declaring a policy.
            The browser is enforcing that policy.
        Think:
            Server:
                "I allow localhost:5173"
            Browser:
                "Okay, I'll honor that rule"
         Analogy
                Imagine a nightclub.
                Server:
                    Allowed guests:
                        - Alice
                        - Bob
                Bouncer (browser):
                        Checks list
                        Lets Alice in
                        Rejects Charlie
                Who enforces the rule?
                         The bouncer.
                         Who defines the rule?
                         The nightclub.
                Similarly:
                    Spring Server
                          defines policy
                    Browser
                            enforces policy
            Why can't the browser decide by itself?
            Because only the server knows who should access its data.
            For example:
                Bank API
                might allow:
                        https://bank.com
                but reject:
                        https://evil-site.com
            The browser cannot guess that.
                So the browser asks the server:
                Who do you trust?
                And the server answers through CORS headers.

*/
package com.socialMedia.platform.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String getGreet(){
        return "Hello, welcome to our application";
    }
}

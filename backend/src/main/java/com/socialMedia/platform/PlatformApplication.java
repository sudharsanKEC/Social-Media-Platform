package com.socialMedia.platform;

import com.socialMedia.platform.model.Dummy;
import com.socialMedia.platform.repository.DummyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication //(exclude = {DataSourceAutoConfiguration.class}) // prevents SpringBoot from auto configuring with the SQL db, which prevents the application from running.
// @SpringBootApplication is a combination of three annotations, @SpringBootConfiguration, @EnableAutoConfiguration and @ComponentScan
public class PlatformApplication {

	public static void main(String[] args) {

		SpringApplication.run(PlatformApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(DummyRepository dummyRepo){
		return args -> dummyRepo.save(new Dummy("First user"));
	}

	/*
		Spring Boot starts and performs component scanning and configuration processing.
		It detects the @Bean method and invokes it, injecting required dependencies like DummyRepository.
		The returned object (a CommandLineRunner lambda) is registered as a bean.
		After the application context is fully initialized, Spring Boot retrieves all CommandLineRunner beans and executes their run() methods.
	 */

}

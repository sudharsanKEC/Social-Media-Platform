package com.socialMedia.platform.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

// this configuration class is for the password encoding mechanism.
@Configuration
public class PasswordConfig {

    // the below method returns an object which will be used by the constructor injection wherever we need the password encoding.
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}

/*

BCryptPasswordEncoder
    BCryptPasswordEncoder is a Spring Security class used to hash passwords before storing them in the database.
    It is used because storing plain passwords is dangerous. If the database leaks, attackers can see everyone's password.
    Hashing is a one-way transformation. You can generate a hash from a password, but you cannot get the original password back from the hash.
    BCrypt is specifically designed for passwords. General-purpose hashes like MD5 and SHA-1 are too fast and are no longer considered secure for password storage.
During signup:
    passwordEncoder.encode(password)
    converts the user's password into a BCrypt hash.
    The hash, not the original password, is stored in the database.
    During login, the user's entered password is never compared directly with the stored hash.
Instead:
    passwordEncoder.matches(rawPassword, storedHash)
    checks whether the entered password generated the stored hash.
    BCrypt automatically generates a random salt for every password.
    A salt is random data added to the password before hashing.
    Because each password gets a different salt, two users with the same password will have completely different hashes.
    This prevents attackers from identifying users with the same password.
    The generated salt is stored inside the BCrypt hash itself.
    Therefore you don't need a separate database column for the salt.
Calling:
    passwordEncoder.encode("hello")
    twice produces different hashes because different salts are used.
    This is why:
    encode(password).equals(storedHash)
    is not how password verification works.
    matches() extracts the salt from the stored hash, rehashes the entered password using that same salt, and compares the result.
    BCrypt is intentionally slow.
    Slow hashing is desirable because it makes brute-force attacks and password cracking much more expensive.
    BCrypt has a cost factor (strength value).
    Higher cost factor = more secure but slower.
    Lower cost factor = faster but less secure.
Example:
        new BCryptPasswordEncoder(12);
    uses a stronger cost factor than:
        new BCryptPasswordEncoder(10);
    Spring usually injects it as a bean:
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    When Spring sees:
        public SignupService(BCryptPasswordEncoder passwordEncoder)
        it searches the container for a BCryptPasswordEncoder bean and injects it.
    A better practice is:
        private final PasswordEncoder passwordEncoder;
        because the service depends on the interface rather than a specific implementation.
        Most Spring Security projects use BCrypt as the default password hashing algorithm.


*/
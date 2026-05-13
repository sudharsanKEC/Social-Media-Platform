package com.socialMedia.platform.repository;

import com.socialMedia.platform.model.OtpVerification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OtpVerificationRepository extends MongoRepository<OtpVerification, String> {
    //
    Optional<OtpVerification> findByEmail(String email);
}
/*

SpringBoot creates a class while running the application which implements the OtpVerificationRepository and it implements all the methods specified in MongoRepository.
But, How does methods like findByEmail() work because we specified them?
This is powered by:
    Query Method Parsing / Method Name Derivation
    Spring reads method names and converts them into MongoDB queries.
    it breaks it into parts:
    | Part     | Meaning         |
    | -------- | --------------- |
    | `findBy` | query operation |
    | `Email`  | field name      |

For Spring to automatically generate the query,
the method name must follow Spring Data’s recognized naming patterns/syntax.
For example:
    findByEmail(String email)
Spring interprets it as:
    findBy + email
and generates query logic.

Valid Examples
    Suppose this document exists:
        public class User {
            private String name;
            private int age;
            private String email;
        }
    Then these are valid:
        findByName(String name)
        findByAge(int age)
        findByEmail(String email)
        findByNameAndAge(String name, int age)
        findByAgeGreaterThan(int age)
        findByNameContaining(String text)
    because Spring understands keywords like:
        findBy
        And
        Or
        GreaterThan
        Containing
        etc.

What if method name is invalid?
    Example:
        findSomethingByMagic(String x)
        Spring may fail during application startup.
        You’ll get exceptions like:
            No property 'magic' found for type User
        or:
            Failed to create query for method
        because Spring cannot understand the method name.

Method Name
        ↓
Spring Parser
        ↓
Generated MongoDB Query
        ↓
Execution

















 */

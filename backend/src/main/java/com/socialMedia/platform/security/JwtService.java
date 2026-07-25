package com.socialMedia.platform.security;

import io.jsonwebtoken.Jwts; // an utility class provided by the JJWT library, it is like an entry point to work with JWTs.
// The above is used to create JWT tokens, parse and validate JWT tokens. It provides the methods like Jwts.builder() - this method creates a JWT builder object.
// And also provides the method: Jwts.parseBuilder() which is used to read and validate an existing token.

import io.jsonwebtoken.security.Keys; // keys is a helper class used for creating cryptographic keys. JWT tokens must be digitally signed so that nobody can modify them.
// This class helps convert your secret string into a proper SecretKey object.

/*
    Example:
        Keys.hmacShaKeyFor(secret.getBytes())
    Converts:
        "ThisIsMyVeryLongSecretKeyForSocialMediaPlatform2026"
        into a cryptographic signing key.
    Without this key:
           JWT cannot be signed.
           JWT cannot be verified.

*/

import java.time.Instant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private SecretKey getSigningKey(){
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(String email){
        Instant now = Instant.now(); // represents the exact moment on time, its a modern api in java. It is used instead of System.currentTimeMillis().

        return Jwts.builder() // this returns a jwt builder object which is used to configure the JWT related settings, we can keep add the settings below
                .subject(email) // adds the user's email as a subject(doer of the action or for the one who JWT is performed now), we can also add user_id for this, but something that uniquely identifies the user is better.
                .issuer("SocialMediaPlatform") // Our platform name
                .issuedAt(Date.from(now)) // The exact current time is got from now, and it was the new modern api, but the issuedAt() wont accept that because it was designed for the old util.Date api, so we are using the Date.from(now) to make it compatible to the issuedAt() method.
                // This issuedAt() represents when the JWT was issued, and the issuedAt() time + expiration time results in the invalidation of the token.
                .expiration(Date.from(now.plusMillis(expiration))) // now.plusMillis(), in this we pass the milli seconds, in which we passes the value expiration to it. The expiration contains the time in milliseconds. We have fixed 1 hour as the expiration time.
                // and in the same way we have converted the now(Modern) to util.Date's using Date.from()
                .signWith(getSigningKey()) // the special operation performed on the payload and header using the secret key. Which gives a token value.
                // region JWT Authentication Notes
                // The token value is indeed the JW token, It will contain the details of header, payload and the signature at last.
                // The process of making the token using Header+Payload+Signature is called signing.
                // The signature depends upon the header and payload values. So every token's signature is based on the exact data in the header and the payload.
                // The header is the one which contains the algorithm name used for signing and also something like the type which has JWT as the value.
                // The payload was built in this program, the builder object has the payload details.
                // The payload will have subject, issuer, issuedAt, expiration and other details if we have added.
                // The header and the payload looks like the below, it was represented in json.
                //endregion
                /*
                Header:
                    The header contains the metadata
                    {
                       "alg":"HMAC"
                       "type":"JWT"
                    }
                Payload:
                    The payload contains the claims of the user's request like user_id, role, expiration time.
                    {
                        "subject":"user@gmail.com",
                        "issuer":"SocialMediaPlatform",
                        "issuedAt":"time,date"
                        "expiration":"expiration time",
                    }

                */
                /*
                The token will be generated something like: XXXX.YYYY.ZZZZ
                The XXXX will be for header.
                The YYYY will be for payload.
                The ZZZZ will be the signature generated based on the header and payload by applying a secret key we had given in the application.properties.
                The ZZZZ is the cryptographic proof that the data has not been tampered with.
                If anything changes in the header and payload then it will directly results in the change of the signature generated.
                */
                .compact(); // this .compact() is for Finish building.  Serialize everything. Generate signature. Return JWT String.

    }

    public String extractEmail(String token){
        return Jwts.parser() // create a jwt parser which is used to parse the JWT token
                .verifyWith(getSigningKey()) // registers the signing key later used for the verification with the sent token.
                .build()
                .parseSignedClaims(token) // now the actual verification happens, if the jwt is found to be invalid then the further method invocations below will not be executed
                .getPayload() // now the payload got from the JW token will be returned
                .getSubject(); // email was set as the subject during building the payload, now it was extracted from the payload.
    }

    // same as the above extracts the email, it extracts the expiration time from the payload.
    public Date extractExpiration(String token){
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();
    }

    public boolean isTokenExpired(String token){
        return extractExpiration(token)
                .before(new Date());
    }

    public boolean isTokenValid(String token){
        try{
            return !isTokenExpired(token);
        }catch(Exception e){
            return false;
        }
    }
}
/*
JWT docs:

    Why JWT?
        Before JWT we only had session based authentications and session id stored in the server.
        In this approach, the user logs in with correct email/username and password. After server validates that, it creates a session id something like ABC123.
        And that id will be given to the frontend and on every request the session id will attached, and once the request reaches the server, it checks the sessionId DB and found whether the id is avaialable there.
        Once the id is available the request will be accepted and respective actions will be performed on server side and the response will be sent to the user's browser.
        So this approach was considered statefull, which means the server remembers that user was logged in. As the server remembers the user it was considered stateful. Note: Here remembering means storing the user's session in DB.
        This approach is called as stateful authentication management.
        Stateful Authentication (Session-Based)
        Let's see the complete flow.
            Login
            User:
                Email + Password
                    ↓
                Server validates.
                    ↓
            Server creates:
                    Session #789
            and stores:
                    Session #789
                        ↓(belongs to)
                    User ID = 25
                    in server memory/database.
            Server sends:
                    Set-Cookie:
                        sessionId=789
                    Browser stores:
                        Cookie:
                           sessionId=789
            Request Flow

                User requests:
                       GET /posts
                Browser automatically attaches:
                        Cookie: sessionId=789

                Server receives:
                        789
                looks into session storage:
                        789 -> User 25
                   and knows who the user is.

                Notice:
                    Browser stores
                        Session ID
                    Server stores
                        Actual session data
                    This is why session authentication is called:
                        Stateful
                    because the server maintains state.
          Disadvantages:
            i) Lookup overhead for session id in the session db.
            ii) In a distributed systems architecture of servers, when using the load balancer, every request goes to a different server of the same Application. So all the servers sharing the same session ID DB is inevitable.
                For example consider a distributed system, such as Server A, Server B and Server C. If the user's login validation is done in server A then the further request from the same user while he was using the application might goes to server A or server B.
                So to know whether that single user's session id is valid, we need to share a common DB among all the three servers(known as "Sticky session" or "shared session store" problem).
            To overcome this JWT is used.
            But still session based statefull authentications are used in banking, fintech applications for more security because of some flaws int he JWT.
            For faster session id access modern servers use the redis DB.

    What is JWT(JSON Web Token)?
            Json Web token(JWT) is the modern alternative for session IDs. It has some advantages while compared to session based stateful authentications.
            This is considered as a stateless authentication.
            JWT is well suited for distributed systems.
            JWT is basically a token, which contains a sequence of characters as a string generated by server initially. It is a mix of numbers and letters.
            The JW Token itself contains three major things in it: Header, Payload and the Signature.
            Let's understand this with an example:
             You are in the login page of our website, you entered the correct username along with the password, then clicked login.
             Now the login request reached the server, server verifies whether the username matches with the password. And if correct, then the backend code(like ours) in the server will create a header, payload and sign it with a secret we have in our server.
             Now the random string generated is based on every values in the header and the payload.
             The random string is known as the signature. When apply the hmac algorithm on the header and payload is known as signing. And after this signing we get the signature.
             The JWT will looks like: u9B$vF8z!mQ2wE5rTxY1uI4oO7pP0aS3dF6gH9jK2lZ5xC8vB1nM4qW7eR0tY3u. This actually contains three information.
             Lets we hypothetically represent the JWT like XXXX.YYYY.ZZZZ then,
                            XXXX -> This part of the JWT represents the Header information.
                            YYYY -> This part of the JWT represents the payload information.
                            ZZZZ -> This part represents the Signature.
             Now the JWT will be sent to the frontend which was running on the browser, now after this whenever a request was made by the same user, the jwt was sent along with that request.
             The server first verifies the JWT before accepting the request and performing any action on the user's data.
             From the token, the server decodes the Header from XXXX and Payload from YYYY.
             And the server applies the same algorithm and the secret key to sign the header and payload again. And after the signing, the signature got from that is verified agains the signature which was already in the token that is the ZZZZ.
             If any mismatch found, then the server will simply reject the request and wont perform any request there.

             Advantages:
                        JWT is extremely useful on distributed systems.
                        No seperate server wants to share a shared DB.
                        Every server computes the header and payload using the same secret key and algorithm, which eliminates the need for a shared DB.
             Disadvantages:
                        Even though it eliminates a need for a sessionID DB. The server still wants to calculate the signature, so a computation overhead was added.
                        Making a JWT invalid(Revocation challenge) is a biggest challenge because if the user logged out before the expiration time, then the JWT still remains valid. If a hacker somehow got that token then doooom!!!!. So for that short lived(access tokens) and long lived(refresh tokens) JWT approach is used.
*/
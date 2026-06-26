package com.socialMedia.platform.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Collections;

/*
    This class is one of the most important parts of JWT authentication n spring security.
    But spring security itself doesn't understand the jwt automatically.
    This filter class acts a translator between our jwt and the Spring security.
*/

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
/*
    Why extend OncePerRequestFilter?
            A Filter intercepts HTTP requests.
            OncePerRequestFilter guarantees:
                            One request
                                ↓
                            Filter executes exactly once
            Without it, the filter might execute multiple times during forwarding or internal dispatching.
*/

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService){
        this.jwtService = jwtService;
    }

    // this method will be executed for every incoming requests.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException{
        String authHeader = request.getHeader("Authorization"); // from the request received, it reads the Authorization in the header
        // If the header from the request has the field Authorization then authHeader will get something similar to "Bearer abc.xyz.def"

        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            // if the header is missing or the authorization field in the header, her authHeader doesn't starts with Bearer, then this if condition will be executed
            // the bearer name is placed before every jwt because of the HTTP standards
            // if the request doesn't contain any jwt it will be passed to the next filter on the chain.
            filterChain.doFilter(request, response);
            // the request will continue after the above line.
            // Think: Filter1 -> Filter2 -> JWT filter -> Filter4 -> Controller
            // calling filterChain.doFilter(...) will pass control to the next filter, without it request stops here and controller will never be executed.
            return;
        }

        String token = authHeader.substring(7);// takes all the remaining string after the index 7.

        if(jwtService.isTokenValid(token)){
            // if the jwt was valid then this if condition part will be executed else the else part is executed.

            String email = jwtService.extractEmail(token); //
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
            // The above line registers the current user. It was simply like: Think of it like: CurrentUser user = new CurrentUser("john@gmail.com"); But Spring uses: UsernamePasswordAuthenticationToken instead.
            // The constructor syntax of UsernamePasswordAuthenticationToken is new UsernamePasswordAuthenticationToken(Object principal,Object credentials,Collections<?> authorities), the parameters respectively answers the question: Who?, Proof?, Permissions?
            // In our code: principal = someone@gmail.com, password = null (none), Roles = empty list(none)
            // Principal will be the current authenticated user's identification credential(username/email).
            // Why password is null? Ans: Password already served its purpose, User authenticated earlier. No need to store password. Hence null.
            // In our application, user has no role, but in some applications users do have roles like: ROLE_USER, ROLE_AUTHOR, ROLE_PREMIUM. Hence authorities are stored as a collection

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            // In the line before the previous line, we had just declared the current user, but that doesn't registers it in the spring security. So spring still thinks user is anonymous.
            // But only after the previous line SecurityContextHolder.getContext().setAuthentication(authenticationToken);, spring knows Current user = someone@gmail.com
            /*
                Internally:
                        SecurityContextHolder
                            ↓
                        SecurityContext
                            ↓
                        Authentication
                Something like:
                        SecurityContext
                             |
                             +---- User: john@gmail.com
                        stored for the current request thread.

            */

            System.out.println("Authenticated user: "+email);
        }
        else{
            // if the token is not valid then this block will be executed.
            throw new ServletException("You are not authenticated");
        }

        System.out.println("JWT filter executed"); // prints JWT filter executed

        // Now after doing this filter in the filter chain, then spring should propagate the request to the next filter. So below we have filterChain.doFilter(request, response);, which makes to continue this request.
        filterChain.doFilter(request, response);
        /*
            Usual spring filter flow of requests will be like:
                            Request
                              ↓
                            JWT Filter
                              ↓
                            Token Valid?
                              ↓
                            Extract Email
                              ↓
                            Create Authentication
                              ↓
                            Store in SecurityContext
                              ↓
                            Next Filter
                              ↓
                            Controller


        */
    }
}

/*
What SecurityContextHolder Really Is
            Imagine Spring maintains:
                Map<Thread, Authentication>
            Conceptually:
                Thread-1 → john@gmail.com
                Thread-2 → anonymous
                Thread-3 → admin@gmail.com
            SecurityContextHolder stores authentication information for the current request thread.

So anywhere later:
        Authentication auth =
            SecurityContextHolder
                .getContext()
                .getAuthentication();
        you can get:
             john@gmail.com

Is SecurityContextHolder like Redux?
        Very good analogy.
        Conceptually:
                Redux Store
                      ↓
                Current Application State

                Similar idea:

                SecurityContextHolder
                      ↓
                Current Security State
        except it is per-request, not global.

Note: For every request a thread will be created, and for every request jwt filtration happens and until the thread gets completed the SecurityContextHolder holds the users jwt subject.
Flow:
        Request arrives
                ↓
        Thread assigned
                ↓
        JWT Filter executes
                ↓
        JWT validated
                ↓
        Email extracted
                ↓
        Authentication created
                ↓
        Stored in SecurityContextHolder
                ↓
        Controllers execute
                ↓
        Response sent
                ↓
        SecurityContext cleared
                ↓
        Thread returned to pool

*/


/*
Why OncePerRequestFilter class was extended by JwtAuthenticationFilter class?
Suppose controller does:
        request.getRequestDispatcher("/profile")
               .forward(request,response);
Request flow:
        Browser
          ↓
        Filter
          ↓
        Controller A
          ↓
        Forward
          ↓
        Controller B
    Without OncePerRequestFilter, filter may execute again.

That's why Spring created:
        OncePerRequestFilter
       to guarantee:
        One HTTP request
        One filter execution

*/

/*
Question: JWT already has authentication. Why aren't we connecting JWT to all those Spring Security classes?
Answer:
        This is the biggest misconception.
        JWT itself does not implement:
                        Filter Chains
                        Role Checks
                        Method Security
                        CSRF Protection
                        Exception Handling
                        Session Management
        JWT is just a token format.
        A JWT is literally something like:
                {
                  "sub":"john@gmail.com",
                  "exp":1712345678
                }
        signed cryptographically.
        That's all.
        JWT only answers:
                Who is this user?
                Can I trust this information?
                Has it expired?
        Spring Security answers different questions:
                Can this user access /admin?
                Can this user call deletePost()?
                Should anonymous users access this endpoint?
                How should authentication failures be handled?
                How should authorization failures be handled?
                JWT doesn't do those things.
        Think of it like:
                Passport = JWT
                Airport Security = Spring Security
                The passport proves identity.
                The airport security decides:
                            Can you enter?
                            Can you board?
                            Can you access restricted zones?

Question:JWT authentication is only for requests after login, right?"
Answer:
        Exactly.
        Flow:
            Login Request
                 ↓
            Username + Password
                 ↓
            Server verifies credentials
                 ↓
            JWT generated
                 ↓
            Client stores JWT
        After that:
                Request 1
                Authorization: Bearer xxx

                Request 2
                Authorization: Bearer xxx

                Request 3
                Authorization: Bearer xxx
        Each request is independently authenticated using JWT.
        The server doesn't remember the login.
        That's why JWT authentication is called:
                Stateless Authentication

Question: How does OncePerRequestFilter know it already executed?
Answer: Very good question.
        Many people think Spring keeps some global list.
        It doesn't.
        Internally OncePerRequestFilter adds a special attribute into the request.
        Conceptually:
                request.setAttribute(
                    "JwtAuthenticationFilter.FILTERED",
                    true
                );
        Later if the filter gets invoked again:
                if(request.getAttribute("FILTERED") != null)
        Spring says:
                Already executed.
                Skip.
        That's basically how it works.

Question: What is Forwarding?
Answer:
        Forwarding means:
                The server internally transfers the same request to another resource.
        Example:
                request.getRequestDispatcher("/profile")
                       .forward(request,response);
        Browser sends:
                GET /home
        Server receives:
                /home
                Controller A executes.
        Then:
                forward("/profile")
        Now internally:
                Controller A
                     ↓
                Controller B
        Same request object.
        Same response object.
        Browser never knows.
        Browser still thinks:
                GET /home
        happened.

Question: What is Dispatching?
Answer:
          Dispatching simply means:
                Sending a request to the next destination.
                Example:
                    Browser
                       ↓
                    DispatcherServlet
                       ↓
                    Controller
          DispatcherServlet is dispatching the request.
          Another example:
                request.getRequestDispatcher("/profile")
            creates a dispatcher.
          Then:
                .forward(...)
            dispatches the request.
          So:
            Forwarding
                    Move request internally to another resource
            Dispatching
                    The act of routing/sending the request somewhere

Question:Does Forwarding Go Through Filters Again?
Answer:
        This is where it gets tricky.
        It depends on filter configuration.
        Imagine:
            Browser
              ↓
            Filter
              ↓
            Controller A
        Now:
                forward("/profile")
            creates another dispatch cycle.
            Potentially:
                    Filter
                      ↓
                    Controller B
                again.
            That's exactly why OncePerRequestFilter exists.
            Without it:
                    JWT Filter
                      ↓
                    Controller A
                      ↓
                    Forward
                      ↓
                    JWT Filter Again
                      ↓
                    Controller B
            The filter executes twice.
            With OncePerRequestFilter:
                        JWT Filter
                          ↓
                        Controller A
                          ↓
                        Forward
                          ↓
                        Already filtered
                          ↓
                        Skip
                          ↓
                        Controller B
*/

/*
Question: Explain Authentication Interface
Answer:
        This is probably the most important Spring Security concept.
        Authentication represents:
                Current authenticated user
        Spring Security defines:
                public interface Authentication

        Conceptually:
            public interface Authentication {
                Object getPrincipal();
                Object getCredentials();
                Collection<?> getAuthorities();
                boolean isAuthenticated();
            }

        Think of it as a User Identity Card.
        Example:
                    User: john@gmail.com
                    Password: hidden
                    Roles: ROLE_USER
                Authenticated:
                    true

Question: UsernamePasswordAuthenticationToken implements Authentication
Answer:
        Your code:
            new UsernamePasswordAuthenticationToken(
                email,
                null,
                Collections.emptyList()
            )
        creates an Authentication object.
        Internally:
            Principal: john@gmail.com
            Credentials: null
            Authorities: []
            Authenticated: true

Think of it like:
            Passport = JWT
            Airport Security = Spring Security
            The passport proves identity.
        The airport security decides:
            Can you enter?
            Can you board?
            Can you access restricted zones?
        The most accurate mental model is:
            JWT = Passport
            Authentication = Spring Security's internal identity card
            SecurityContextHolder = Wallet holding that identity card for the current request
            JwtAuthenticationFilter = Officer who reads the passport and creates the identity card
*/


/*
Question: We manually authenticated jwt and then we are setting up the Authentication interface's child class UsernamePasswordAuthenticationToken's object.
            And thats how actually spring knows the current user is authenticated and allows the further process, am I right?
Answer:
        Yes. Your understanding is now very close to how Spring Security actually works.
        Let's verify it carefully.
            What your JWT filter is really doing
                Step 1: You manually authenticate the JWT
                                if(jwtService.isTokenValid(token))
                                At this point you are verifying:
                                    Signature
                                    Expiration
                                    Integrity
                                (or at least you should be)
                            So effectively:
                                JWT verified
                                ↓
                                User identity trusted
                                ↓
                                Authentication successful
                            Spring Security has not done anything yet.

                 Step 2: Create Authentication object
                            UsernamePasswordAuthenticationToken authenticationToken =
                                    new UsernamePasswordAuthenticationToken(
                                            email,
                                            null,
                                            Collections.emptyList()
                                    );
                         This creates Spring Security's representation of:
                                    Current User: john@gmail.com
                                    Authenticated: true

                  Step 3: Store it in SecurityContext
                            SecurityContextHolder
                                    .getContext()
                                    .setAuthentication(authenticationToken);
                           Now Spring Security sees:
                                Current request contains an authenticated user

                  Step 4: Spring Security trusts it
                            Later another filter may ask:
                            Authentication auth =
                                    SecurityContextHolder
                                            .getContext()
                                            .getAuthentication();
                            and receive:
                                john@gmail.com
                            Therefore:
                                Request is authenticated
                                So your sentence is correct
         You wrote:
                We manually authenticated JWT and then we are setting up the Authentication interface's child class UsernamePasswordAuthenticationToken's object. And thats how actually spring knows the current user is authenticated and allows the further process.
            That's essentially correct.
         More accurately:
                JWT Authentication
                        ↓
                Create Authentication object
                        ↓
                Store in SecurityContextHolder
                        ↓
                Spring Security now considers the request authenticated
            One small correction
          Many developers think:
            new UsernamePasswordAuthenticationToken(...)
          performs authentication.
          It doesn't.
           Authentication already happened here:
                jwtService.isTokenValid(token)
          The token object merely represents the result of authentication.
          Think:
            Passport Check
                  ↓
            Verified
                  ↓
            Issue Visitor Badge

          The passport check is JWT validation.
          The visitor badge is:
                UsernamePasswordAuthenticationToken
*/

/*
Question: But the principal should contain only the field which identifies the user uniquely right? So it can be a username or email but how does a User object? Then again, when we get User details how we get a field exactly which represents the user uniquely like email or username? So my doubt is shall we give the entire particular User's object to pass it as a principal?
Answer: 1. Should the principal contain only the unique identifier?
            No. That's a common misconception.
            The principal is not defined as "the unique identifier".
            It is defined as:
                    The identity of the authenticated user.
                    How you represent that identity is up to you.
                    Spring intentionally makes it generic.
            Option 1: Store only the email (your current approach)
                    new UsernamePasswordAuthenticationToken(
                        "john@gmail.com",
                        null,
                        authorities
                    );
                Then:
                    authentication.getPrincipal()
                returns:
                    "john@gmail.com"
            Advantages:
                Very small object.
                Easy to store.
                Simple.
            Disadvantage:
                Every time you need more information:
                    String email = (String) authentication.getPrincipal();
                    User user = userRepository.findByUserEmail(email);
                you must query the database.

            Option 2: Store the whole User object
                Suppose your User class is:
                    public class User {
                        private String id;
                        private String userEmail;
                        private String name;
                    }
                You can do:
                    User user = userRepository.findByUserEmail(email).get();
                    UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                            user,
                            null,
                            Collections.emptyList()
                        );
                Now:
                    User currentUser =
                        (User) authentication.getPrincipal();
                    No database query needed.
                Is this allowed?
                    Absolutely.
                Remember the constructor:
                    UsernamePasswordAuthenticationToken(
                        Object principal,
                        Object credentials,
                        Collection<?> authorities
                    )
                Notice:
                    Object principal
                not
                    String principal
                Spring is literally telling you:
                    "Store whatever object best represents your authenticated user."
                    Then how do we know the user's email?
                    Easy.
                    If the principal is a User object:
                        User user = (User) authentication.getPrincipal();
                    Then:
                        user.getUserEmail();
                        or
                        user.getId();
                        or
                        user.getName();
                    Everything is already available.
                Why do many projects use UserDetails instead?
                        Spring Security defines the UserDetails interface.
                It represents:
                        Authenticated User
                A typical custom implementation looks like:
                        public class CustomUserDetails implements UserDetails {
                            private User user;
                            ...
                        }
                Then:
                        authentication.getPrincipal()
                returns:
                        CustomUserDetails
                From that:
                        customUserDetails.getUser().getId();
                        customUserDetails.getUser().getUserEmail();
                        customUserDetails.getUser().getName();
                No extra database lookup.
                Which approach is better?
                        There isn't one universally correct answer.
                        Small applications
                Store:
                        String email
                  Simple.

            Large applications
                Store:
                    UserDetails
                    or
                    CustomUserDetails
                More efficient.



*/






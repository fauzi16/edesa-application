package com.edesa.controller.standard.auth;



import java.util.ArrayList;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.edesa.config.JwtTokenUtil;
import com.edesa.dao.dtpl.master.UserRepository;
import com.edesa.model.dtpl.master.User;
import com.edesa.model.security.JwtRequest;
import com.edesa.model.security.JwtResponse;

@RestController
@CrossOrigin
public class JwtAuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService jwtInMemoryUserDetailsService;

    @Autowired
    private UserRepository userRepoCustom;

    // private BCryptPasswordEncoder bCryptPasswordEncoder;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = jwtInMemoryUserDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @RequestMapping(value = "/authenticate2", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken2(@RequestBody JwtRequest authenticationRequest)
            throws Exception {

        // this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
        // String encodedPassword = bCryptPasswordEncoder.encode(authenticationRequest.getPassword());

        User user = null;

        try {
            user = userRepoCustom.findByUsernameAndPassword(authenticationRequest.getUsername(),
                    authenticationRequest.getPassword());
        } catch (Exception e) {
            logger.error("Failed Login. " + authenticationRequest.getUsername() + "; " + e.getMessage(), e);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Credential");
        }
        

        if (user != null) {
            UserDetails userDetails =  new org.springframework.security.core.userdetails.User(user.getUsername(), 
                user.getPassword(), new ArrayList<>());

            final String token = jwtTokenUtil.generateToken(userDetails);

            logger.info("Successfully Login. " + user.getUsername());

            return ResponseEntity.ok(new JwtResponse(token));
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Credential");
        }
    }

    @RequestMapping(value = "/authenticate/refresh", method = RequestMethod.GET)
    public ResponseEntity<?> refreshToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = jwtInMemoryUserDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            logger.error("Failed Login. " + username + "; " + e.getMessage(), e);
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            logger.error("Failed Login. " + username + "; " + e.getMessage(), e);
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        logger.info("Successfully Login. " + username);
    }
}

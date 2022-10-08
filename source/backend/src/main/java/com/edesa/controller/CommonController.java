package com.edesa.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.edesa.config.JwtTokenUtil;

import io.jsonwebtoken.ExpiredJwtException;

public class CommonController {

    protected final Logger logger = LoggerFactory.getLogger(getClass());
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    public String getUserNameFromHeader(String requestTokenHeader) {
        String username = null;
        String jwtToken = null;
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
            } catch (IllegalArgumentException e) {
                logger.error("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                logger.error("JWT Token has expired");
            }
        } else {
            logger.warn("JWT Token does not begin with Bearer String");
        }
        return username;
    }

}

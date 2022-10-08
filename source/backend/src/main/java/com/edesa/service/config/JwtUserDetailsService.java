package com.edesa.service.config;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.edesa.dao.dtpl.master.UserRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        if ("javainuse".equals(username)) {
            return new User("user@javainuse", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6",
                    new ArrayList<GrantedAuthority>());
        } else {
            com.edesa.model.dtpl.master.User u = userRepository.findByUsername(username);

            if (u != null) {
                return new User(u.getUsername(), u.getPassword(), new ArrayList<GrantedAuthority>());
            } else {
                throw new UsernameNotFoundException("email not found");
            }
        }

    }

}

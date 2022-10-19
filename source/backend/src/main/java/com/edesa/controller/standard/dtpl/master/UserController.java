package com.edesa.controller.standard.dtpl.master;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edesa.controller.AbstractController;
import com.edesa.model.dtpl.master.User;
import com.edesa.service.dtpl.master.UserService;

@RestController
@CrossOrigin
@RequestMapping(value = "/users")
public class UserController extends AbstractController<User, Long, UserService> {

    @Autowired
    UserController(UserService service) {
        super(service, User.class, Long.class);
    }

    // @
    // public User register(String name,  String email, String password, String nomorHp, String alamat) {
    //     return null;
    // }
    
}

package com.edesa.controller.standard.dtpl.master;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

    @RequestMapping(value = "/find-by-username", method = RequestMethod.POST)
    public User findUserByUsername(@RequestBody FindByUserNameParam username) {
        return this.service.getDao().findByUsername(username.getUsername());
    }

    
}

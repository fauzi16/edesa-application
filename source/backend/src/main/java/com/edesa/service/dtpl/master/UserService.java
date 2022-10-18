package com.edesa.service.dtpl.master;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edesa.dao.dtpl.master.UserRepository;
import com.edesa.model.dtpl.master.User;
import com.edesa.service.AbstractService;

@Service
public class UserService extends AbstractService<User, Long, UserRepository> {

    @Autowired
    protected UserService(UserRepository dao) {
        super(dao);
    }
    
}
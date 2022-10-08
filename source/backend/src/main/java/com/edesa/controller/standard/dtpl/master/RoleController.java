package com.edesa.controller.standard.dtpl.master;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edesa.controller.AbstractController;
import com.edesa.model.dtpl.master.Role;
import com.edesa.service.dtpl.master.RoleService;

@RestController
@CrossOrigin
@RequestMapping(value = "/roles")
public class RoleController extends AbstractController<Role, Long, RoleService> {

    @Autowired
    RoleController(RoleService service) {
        super(service, Role.class, Long.class);
    }
    
}

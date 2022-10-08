package com.edesa.service.dtpl.master;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edesa.dao.dtpl.master.RoleRepository;
import com.edesa.model.dtpl.master.Role;
import com.edesa.service.AbstractService;

@Service
public class RoleService extends AbstractService<Role, Long, RoleRepository> {

    @Autowired
    protected RoleService(RoleRepository dao) {
        super(dao);
    }
    
}

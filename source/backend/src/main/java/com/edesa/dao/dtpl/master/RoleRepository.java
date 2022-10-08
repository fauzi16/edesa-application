package com.edesa.dao.dtpl.master;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edesa.model.dtpl.master.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
}
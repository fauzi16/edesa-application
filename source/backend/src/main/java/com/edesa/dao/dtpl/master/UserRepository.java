package com.edesa.dao.dtpl.master;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edesa.model.dtpl.master.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    public User findByUsernameAndPassword(String username, String password);

    public User findByUsername(String username);

    public User findByUserInfoId(Long userInfoId);

}

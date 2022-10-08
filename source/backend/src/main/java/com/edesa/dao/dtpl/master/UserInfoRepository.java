package com.edesa.dao.dtpl.master;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edesa.model.dtpl.master.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    
}

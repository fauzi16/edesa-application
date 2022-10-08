package com.edesa.service.dtpl.master;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edesa.dao.dtpl.master.UserInfoRepository;
import com.edesa.model.dtpl.master.UserInfo;
import com.edesa.service.AbstractService;

@Service
public class UserInfoService extends AbstractService<UserInfo, Long, UserInfoRepository> {

    @Autowired
    protected UserInfoService(UserInfoRepository dao) {
        super(dao);
    }
    
}

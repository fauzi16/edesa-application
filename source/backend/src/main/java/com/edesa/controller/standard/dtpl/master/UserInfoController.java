package com.edesa.controller.standard.dtpl.master;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edesa.controller.AbstractController;
import com.edesa.model.dtpl.master.UserInfo;
import com.edesa.service.dtpl.master.UserInfoService;


@RestController
@CrossOrigin
@RequestMapping(value = "/userInfos")
public class UserInfoController extends AbstractController<UserInfo, Long, UserInfoService> {

    @Autowired
    UserInfoController(UserInfoService service) {
        super(service, UserInfo.class, Long.class);
    }
    
}

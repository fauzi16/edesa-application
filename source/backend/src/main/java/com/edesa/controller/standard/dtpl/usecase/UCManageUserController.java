package com.edesa.controller.standard.dtpl.usecase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.edesa.controller.standard.dtpl.BaseController;
import com.edesa.controller.standard.dtpl.usecase.model.UserAdminInfo;
import com.edesa.controller.standard.dtpl.usecase.model.UserPerangkatDesaInfo;
import com.edesa.model.dtpl.master.User;
import com.edesa.model.dtpl.master.UserInfo;
import com.edesa.service.dtpl.usecase.UCManageUserService;



@RestController
@CrossOrigin
@RequestMapping(value="/management-user")
public class UCManageUserController extends BaseController {

    @Autowired
    private UCManageUserService service;
    
    @RequestMapping(value = "/create/admin", method = RequestMethod.POST)
    public User createUserAdmin(@RequestBody UserAdminInfo adminInfo){
        return service.createUserAdmin(adminInfo);
    }

    @RequestMapping(value = "/create/perangkat-desa", method = RequestMethod.POST)
    public User createUserPerangkatDesa(@RequestBody UserPerangkatDesaInfo info){
        return service.createUserPerangkatDesa(info);
    }

    @RequestMapping(value = "/edit/user", method = RequestMethod.POST)
    public User editUser(String username, @RequestBody UserInfo payloadUserInfo) {
        return service.editUser(username, payloadUserInfo);
    }

    @RequestMapping(value = "/status/user", method = RequestMethod.POST)
    public User activateOrInactivateUser(String username, boolean isActive) {
        return service.activateOrInactivateUser(username, isActive);
    }

}

package com.edesa.controller.standard.dtpl.usecase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.edesa.controller.standard.dtpl.BaseController;
import com.edesa.controller.standard.dtpl.usecase.model.EditUserInfo;
import com.edesa.controller.standard.dtpl.usecase.model.SetActivationInfo;
import com.edesa.controller.standard.dtpl.usecase.model.UserAdminInfo;
import com.edesa.controller.standard.dtpl.usecase.model.UserPerangkatDesaInfo;
import com.edesa.model.dtpl.master.User;
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
    public User editUser(@RequestBody EditUserInfo payloadUserInfo) {
        return service.editUser(payloadUserInfo.getUsername(), payloadUserInfo.getUserInfo());
    }

    @RequestMapping(value = "/status/user", method = RequestMethod.POST)
    public User activateOrInactivateUser(@RequestBody SetActivationInfo setActivationInfo) {
        return service.activateOrInactivateUser(setActivationInfo.getUsername(), setActivationInfo.isActivate());
    }

}

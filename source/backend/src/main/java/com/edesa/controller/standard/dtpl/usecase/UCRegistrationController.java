package com.edesa.controller.standard.dtpl.usecase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.edesa.controller.standard.dtpl.BaseController;
import com.edesa.controller.standard.dtpl.usecase.model.RegInfo;
import com.edesa.model.dtpl.master.User;
import com.edesa.service.dtpl.usecase.UCRegistrationService;

@RestController
@CrossOrigin
@RequestMapping(value="/registration")
public class UCRegistrationController extends BaseController {
    
    @Autowired
    private UCRegistrationService service;

    @RequestMapping(value = "/warga", method = RequestMethod.POST)
    public User registrationWarga(@RequestBody RegInfo regInfo) {
        return service.registrationWarga(regInfo);
    }

}

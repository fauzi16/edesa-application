package com.edesa.controller.standard.dtpl.usecase;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.edesa.controller.standard.dtpl.BaseController;
import com.edesa.controller.standard.dtpl.usecase.model.RegInfo;
import com.edesa.dao.dtpl.master.RegistrationInfoRepository;
import com.edesa.dao.dtpl.master.RoleRepository;
import com.edesa.dao.dtpl.master.UserInfoRepository;
import com.edesa.dao.dtpl.master.UserRepository;
import com.edesa.exception.EDesaException;
import com.edesa.model.dtpl.master.RegistrationInfo;
import com.edesa.model.dtpl.master.Role;
import com.edesa.model.dtpl.master.User;
import com.edesa.model.dtpl.master.UserInfo;

@RestController
@CrossOrigin
@RequestMapping(value="/registration")
public class UCRegistrationController extends BaseController {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private RegistrationInfoRepository registrationInfoRepository;

    @Autowired
    private RoleRepository roleRepository;

    @RequestMapping(value = "/warga", method = RequestMethod.POST)
    public User registrationWarga(RegInfo regInfo) {
        if(isNil(regInfo.getAlamat())) {
            throw new EDesaException("alamat tidak boleh kosong");
        }
        if(isNil(regInfo.getEmail())) {
            throw new EDesaException("email tidak boleh kosong");
        }
        if(isNil(regInfo.getHp())) {
            throw new EDesaException("hp tidak boleh kosong");
        }
        if(isNil(regInfo.getName())) {
            throw new EDesaException("name tidak boleh kosong");
        }
        if(isNil(regInfo.getPassword())) {
            throw new EDesaException("password tidak boleh kosong");
        }

        User sameUser = userRepository.findByUsername(regInfo.getEmail());
        if(sameUser != null) {
            throw new EDesaException("username sudah digunakan"); 
        }

        RegistrationInfo info = new RegistrationInfo();
        info.setRegistrationDate(new Timestamp(System.currentTimeMillis()));
        registrationInfoRepository.save(info);
        
        UserInfo userInfo = new UserInfo();
        userInfo.setAddress(regInfo.getAlamat());
        userInfo.setBirthDate(null);
        userInfo.setEmail(regInfo.getEmail());
        userInfo.setHp(regInfo.getHp());
        userInfo.setName(regInfo.getName());
        userInfo.setRegistrationInfoId(info.getId());
        userInfo.setRegistrationInfo(info);
        
        Role roleWarga = roleRepository.findById(3l).get();
        userInfo.setRole(roleWarga);
        userInfo.setRoleId(roleWarga.getId());
        userInfoRepository.save(userInfo);

        User user = new User();
        user.setPassword(regInfo.getPassword());
        user.setUsername(regInfo.getEmail());
        user.setUserInfo(userInfo);
        user.setUserInfoId(userInfo.getId());
        user.setActive(true);
        userRepository.save(user);

        return user;
    }

}

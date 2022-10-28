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
import com.edesa.dao.dtpl.master.BusinessUnitRepository;
import com.edesa.dao.dtpl.master.ResidenceRepository;
import com.edesa.dao.dtpl.master.RoleRepository;
import com.edesa.dao.dtpl.master.UserInfoRepository;
import com.edesa.dao.dtpl.master.UserRepository;
import com.edesa.exception.EDesaException;
import com.edesa.model.dtpl.master.BusinessUnit;
import com.edesa.model.dtpl.master.Residence;
import com.edesa.model.dtpl.master.Role;
import com.edesa.model.dtpl.master.User;
import com.edesa.model.dtpl.master.UserInfo;



@RestController
@CrossOrigin
@RequestMapping(value="/management-user")
public class UCManageUserController extends BaseController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private BusinessUnitRepository businessUnitRepository;

    @Autowired
    private ResidenceRepository residenceRepository;
    
    @RequestMapping(value = "/create/admin", method = RequestMethod.POST)
    public User createUserAdmin(@RequestBody UserAdminInfo adminInfo){
        if(isNil(adminInfo.getAlamat())) {
            throw new EDesaException("alamat tidak boleh kosong");
        }
        if(isNil(adminInfo.getEmail())) {
            throw new EDesaException("email tidak boleh kosong");
        }
        if(isNil(adminInfo.getHp())) {
            throw new EDesaException("hp tidak boleh kosong");
        }
        if(isNil(adminInfo.getName())) {
            throw new EDesaException("name tidak boleh kosong");
        }

        User sameUser = userRepository.findByUsername(adminInfo.getEmail());
        if(sameUser != null) {
            throw new EDesaException("username sudah digunakan"); 
        }
        
        UserInfo userInfo = new UserInfo();
        userInfo.setAddress(adminInfo.getAlamat());
        userInfo.setBirthDate(null);
        userInfo.setEmail(adminInfo.getEmail());
        userInfo.setHp(adminInfo.getHp());
        userInfo.setName(adminInfo.getName());
        userInfoRepository.save(userInfo);
        
        Role roleAdmin = roleRepository.findById(1l).get();
        userInfo.setRole(roleAdmin);
        userInfo.setRoleId(roleAdmin.getId());

        User user = new User();
        user.setPassword("password");
        user.setUsername(adminInfo.getEmail());
        user.setUserInfo(userInfo);
        user.setUserInfoId(userInfo.getId());
        user.setActive(true);
        userRepository.save(user);

        return user;
    }

    @RequestMapping(value = "/create/perangkat-desa", method = RequestMethod.POST)
    public User createUserPerangkatDesa(@RequestBody UserPerangkatDesaInfo info){
        if(isNil(info.getAlamat())) {
            throw new EDesaException("alamat tidak boleh kosong");
        }
        if(isNil(info.getEmail())) {
            throw new EDesaException("email tidak boleh kosong");
        }
        if(isNil(info.getHp())) {
            throw new EDesaException("hp tidak boleh kosong");
        }
        if(isNil(info.getName())) {
            throw new EDesaException("name tidak boleh kosong");
        }

        User sameUser = userRepository.findByUsername(info.getEmail());
        if(sameUser != null) {
            throw new EDesaException("username sudah digunakan"); 
        }

        BusinessUnit businessUnit = businessUnitRepository.findById(info.getBusinessUnit()).get();
        if(businessUnit == null) {
            throw new EDesaException("business unit tidak ditemukan"); 
        }

        Residence residence = residenceRepository.findById(info.getResidenceId()).get();
        if(residence == null) {
            throw new EDesaException("residence tidak ditemukan"); 
        }
        
        UserInfo userInfo = new UserInfo();
        userInfo.setAddress(info.getAlamat());
        userInfo.setBirthDate(null);
        userInfo.setEmail(info.getEmail());
        userInfo.setHp(info.getHp());
        userInfo.setName(info.getName());
        userInfo.setBusinessUnit(businessUnit);
        userInfo.setBusinessUnitId(businessUnit.getId());
        userInfo.setResidenceId(residence.getId());
        userInfoRepository.save(userInfo);

        
        
        Role roleAdmin = roleRepository.findById(2l).get();
        userInfo.setRole(roleAdmin);
        userInfo.setRoleId(roleAdmin.getId());

        User user = new User();
        user.setPassword("password");
        user.setUsername(info.getEmail());
        user.setUserInfo(userInfo);
        user.setUserInfoId(userInfo.getId());
        user.setActive(true);
        userRepository.save(user);

        return user;
    }

    @RequestMapping(value = "/edit/user", method = RequestMethod.POST)
    public User editUser(String username, @RequestBody UserInfo payloadUserInfo) {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw new EDesaException("User dengan username '" + username + "' tidak ditemukan");
        }

        UserInfo savedUserInfo = user.getUserInfo();
        this.setNewValues(savedUserInfo, payloadUserInfo);

        userInfoRepository.save(savedUserInfo);
        
        return user;
    }

    @RequestMapping(value = "/status/user", method = RequestMethod.POST)
    public User activateOrInactivateUser(String username, boolean isActive) {
        User user = userRepository.findByUsername(username);

        if(user == null) {
            throw new EDesaException("User dengan username '" + username + "' tidak ditemukan");
        }

        user.setActive(isActive);
    
        userRepository.save(user);

        return user;
    }

}

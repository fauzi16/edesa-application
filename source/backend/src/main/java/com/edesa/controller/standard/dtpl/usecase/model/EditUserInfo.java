package com.edesa.controller.standard.dtpl.usecase.model;

import com.edesa.model.dtpl.master.UserInfo;

public class EditUserInfo {
    
    private String username;
    private UserInfo userInfo;
    
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public UserInfo getUserInfo() {
        return userInfo;
    }
    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }

    
}

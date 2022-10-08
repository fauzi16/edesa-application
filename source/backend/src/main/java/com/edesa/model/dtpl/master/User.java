package com.edesa.model.dtpl.master;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiModelProperty.AccessMode;


@Entity
@Table(name = "dtpl_mst_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String password;
    private boolean active;

    @OneToOne
    @ApiModelProperty(accessMode = AccessMode.READ_ONLY)
    @JoinColumn(name = "userInfoId", referencedColumnName = "id", insertable = false, updatable = false)
    private UserInfo userInfo;
    private Long userInfoId;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public boolean isActive() {
        return active;
    }
    public void setActive(boolean active) {
        this.active = active;
    }
    public UserInfo getUserInfo() {
        return userInfo;
    }
    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }
    public Long getUserInfoId() {
        return userInfoId;
    }
    public void setUserInfoId(Long userInfoId) {
        this.userInfoId = userInfoId;
    }

    

}

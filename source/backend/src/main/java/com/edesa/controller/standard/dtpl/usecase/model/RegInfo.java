package com.edesa.controller.standard.dtpl.usecase.model;

public class RegInfo {

    private String name;
    private String email;
    private String alamat;
    private String password;
    private String hp;

    public RegInfo() {}

    public RegInfo(String name, String email, String alamat, String password, String hp) {
        this.name = name;
        this.email = email;
        this.alamat = alamat;
        this.password = password;
        this.hp = hp;
    }
    
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getAlamat() {
        return alamat;
    }
    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getHp() {
        return hp;
    }
    public void setHp(String hp) {
        this.hp = hp;
    }

}

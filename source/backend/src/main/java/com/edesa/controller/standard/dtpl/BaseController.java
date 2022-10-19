package com.edesa.controller.standard.dtpl;

public class BaseController {
    
    public boolean isNil(String value) {
        if(value == null || value.isEmpty()) {
            return true;
        }
        return false;
    }

}

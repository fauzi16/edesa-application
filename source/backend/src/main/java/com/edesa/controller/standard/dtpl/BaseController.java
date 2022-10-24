package com.edesa.controller.standard.dtpl;

import java.lang.reflect.Field;

import com.edesa.exception.EDesaException;

public class BaseController {

    public boolean isNil(String value) {
        if (value == null || value.isEmpty()) {
            return true;
        }
        return false;
    }

    public void setNewValues(Object saved, Object payload) {
        try {
            Class<?> clazz = payload.getClass().getClass();
            Field[] fields = clazz.getFields();
            for (Field field : fields) {
                if (field.getName().equals("id"))
                    continue;

                field.setAccessible(true);
                Object newValue = field.get(payload);
                if (newValue != null) {
                    field.set(saved, newValue);
                }
            }
        } catch (Exception e) {
            throw new EDesaException("Terjadi kesalahan ketika update data");
        }
    }

}

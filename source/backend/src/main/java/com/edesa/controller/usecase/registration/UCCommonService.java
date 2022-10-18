package com.edesa.controller.usecase.registration;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

import com.edesa.model.dtpl.master.User;

@Service
public class UCCommonService {

    public User userInfo(String email) {
        return null;
    }

    public void getImage(HttpServletResponse response, String entity, Long entityId, Integer imageSeq) {
    }

    public void addImage(String entity, Long entityId, List<String> imagesBase64) {
    }

    public void removeImage(String entity, Long entityId, Integer imageSeq) {
    }

}

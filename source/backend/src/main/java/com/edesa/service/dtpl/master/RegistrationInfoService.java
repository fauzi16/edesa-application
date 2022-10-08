package com.edesa.service.dtpl.master;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edesa.dao.dtpl.master.RegistrationInfoRepository;
import com.edesa.model.dtpl.master.RegistrationInfo;
import com.edesa.service.AbstractService;

@Service
public class RegistrationInfoService extends AbstractService<RegistrationInfo, Long, RegistrationInfoRepository> {

    @Autowired
    protected RegistrationInfoService(RegistrationInfoRepository dao) {
        super(dao);
    }
    
}

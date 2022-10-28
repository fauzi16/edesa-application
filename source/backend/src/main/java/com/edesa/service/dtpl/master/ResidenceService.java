package com.edesa.service.dtpl.master;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edesa.dao.dtpl.master.ResidenceRepository;
import com.edesa.model.dtpl.master.Residence;
import com.edesa.service.AbstractService;

@Service
public class ResidenceService extends AbstractService<Residence, Long, ResidenceRepository> {

    @Autowired
    protected ResidenceService(ResidenceRepository dao) {
        super(dao);
    }
    
}

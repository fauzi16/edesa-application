package com.edesa.service.dtpl.master;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edesa.dao.dtpl.master.BusinessUnitRepository;
import com.edesa.model.dtpl.master.BusinessUnit;
import com.edesa.service.AbstractService;

@Service
public class BusinessInfoService extends AbstractService<BusinessUnit, Long, BusinessUnitRepository> {

    @Autowired
    protected BusinessInfoService(BusinessUnitRepository dao) {
        super(dao);
    }
    
}
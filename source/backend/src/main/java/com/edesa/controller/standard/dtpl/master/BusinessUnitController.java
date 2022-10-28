package com.edesa.controller.standard.dtpl.master;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edesa.controller.AbstractController;
import com.edesa.model.dtpl.master.BusinessUnit;
import com.edesa.service.dtpl.master.BusinessUnitService;

@RestController
@CrossOrigin
@RequestMapping(value = "/businessUnits")
public class BusinessUnitController extends AbstractController<BusinessUnit, Long, BusinessUnitService> {
    
    @Autowired
    BusinessUnitController(BusinessUnitService service) {
        super(service, BusinessUnit.class, Long.class);
    }
    
}

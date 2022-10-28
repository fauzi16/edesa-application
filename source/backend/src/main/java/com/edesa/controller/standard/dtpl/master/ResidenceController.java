package com.edesa.controller.standard.dtpl.master;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edesa.controller.AbstractController;
import com.edesa.model.dtpl.master.Residence;
import com.edesa.service.dtpl.master.ResidenceService;

@RestController
@CrossOrigin
@RequestMapping(value = "/residences")
public class ResidenceController extends AbstractController<Residence, Long, ResidenceService> {

    @Autowired
    ResidenceController(ResidenceService service) {
        super(service, Residence.class, Long.class);
    }
    
}

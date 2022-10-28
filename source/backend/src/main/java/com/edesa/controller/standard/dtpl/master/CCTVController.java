package com.edesa.controller.standard.dtpl.master;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edesa.controller.AbstractController;
import com.edesa.model.dtpl.master.CCTV;
import com.edesa.service.dtpl.master.CCTVService;

@RestController
@CrossOrigin
@RequestMapping(value = "/cctvs")
public class CCTVController extends AbstractController<CCTV, Long, CCTVService> {

    @Autowired
    CCTVController(CCTVService service) {
        super(service, CCTV.class, Long.class);
    }
    
}

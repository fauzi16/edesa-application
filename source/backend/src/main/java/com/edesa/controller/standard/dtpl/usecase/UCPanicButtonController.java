package com.edesa.controller.standard.dtpl.usecase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.edesa.controller.standard.dtpl.BaseController;
import com.edesa.controller.standard.dtpl.usecase.model.PanicButtonPushInfo;
import com.edesa.model.dtpl.transaction.Issue;
import com.edesa.service.dtpl.usecase.UCPanicButtonService;

@RestController
@CrossOrigin
@RequestMapping(value="/panic-button")
public class UCPanicButtonController extends BaseController {
    
    @Autowired
    private UCPanicButtonService service;
    

    @RequestMapping(value = "/push-panic-button", method = RequestMethod.POST)
    public Issue pushPanicButton(@RequestBody PanicButtonPushInfo buatLaporanInfo) {

        return service.pushPanicButton(buatLaporanInfo);
    }

}

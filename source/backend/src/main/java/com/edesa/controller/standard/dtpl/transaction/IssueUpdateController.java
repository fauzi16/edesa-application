package com.edesa.controller.standard.dtpl.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edesa.controller.AbstractController;
import com.edesa.model.dtpl.transaction.IssueUpdate;
import com.edesa.service.dtpl.transaction.IssueUpdateService;

@RestController
@CrossOrigin
@RequestMapping(value = "/issueUpdates")
public class IssueUpdateController extends AbstractController<IssueUpdate, Long, IssueUpdateService> {

    @Autowired
    IssueUpdateController(IssueUpdateService service) {
        super(service, IssueUpdate.class, Long.class);
    }
    
}
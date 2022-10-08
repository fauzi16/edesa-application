package com.edesa.controller.standard.dtpl.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edesa.controller.AbstractController;
import com.edesa.model.dtpl.transaction.Issue;
import com.edesa.service.dtpl.transaction.IssueService;

@RestController
@CrossOrigin
@RequestMapping(value = "/issues")
public class IssueController extends AbstractController<Issue, Long, IssueService> {

    @Autowired
    IssueController(IssueService service) {
        super(service, Issue.class, Long.class);
    }
    
}

package com.edesa.service.dtpl.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edesa.dao.dtpl.transaction.IssueRepository;
import com.edesa.model.dtpl.transaction.Issue;
import com.edesa.service.AbstractService;

@Service
public class IssueService extends AbstractService<Issue, Long, IssueRepository> {

    @Autowired
    protected IssueService(IssueRepository dao) {
        super(dao);
    }
    
}

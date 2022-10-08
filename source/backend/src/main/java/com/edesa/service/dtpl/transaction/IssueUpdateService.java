package com.edesa.service.dtpl.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edesa.dao.dtpl.transaction.IssueUpdateRepository;
import com.edesa.model.dtpl.transaction.IssueUpdate;
import com.edesa.service.AbstractService;

@Service
public class IssueUpdateService extends AbstractService<IssueUpdate, Long, IssueUpdateRepository> {

    @Autowired
    protected IssueUpdateService(IssueUpdateRepository dao) {
        super(dao);
    }
    
}

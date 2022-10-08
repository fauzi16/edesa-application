package com.edesa.dao.dtpl.transaction;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edesa.model.dtpl.transaction.IssueUpdate;

public interface IssueUpdateRepository extends JpaRepository<IssueUpdate, Long> {
    
}

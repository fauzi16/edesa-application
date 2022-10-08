package com.edesa.dao.dtpl.transaction;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edesa.model.dtpl.transaction.Issue;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    
}

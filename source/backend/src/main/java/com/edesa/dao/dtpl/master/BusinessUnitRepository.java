package com.edesa.dao.dtpl.master;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edesa.model.dtpl.master.BusinessUnit;

public interface BusinessUnitRepository extends JpaRepository<BusinessUnit, Long> {
    
}
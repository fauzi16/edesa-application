package com.edesa.dao.dtpl.master;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edesa.model.dtpl.master.Residence;

public interface ResidenceRepository extends JpaRepository<Residence, Long> {
    
}

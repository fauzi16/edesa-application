package com.edesa.dao.dtpl.master;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edesa.model.dtpl.master.CCTV;

public interface CCTVRepository extends JpaRepository<CCTV, Long> {
    
}

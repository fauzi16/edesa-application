package com.edesa.service.dtpl.master;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edesa.dao.dtpl.master.CCTVRepository;
import com.edesa.model.dtpl.master.CCTV;
import com.edesa.service.AbstractService;

@Service
public class CCTVService extends AbstractService<CCTV, Long, CCTVRepository> {

    @Autowired
    protected CCTVService(CCTVRepository dao) {
        super(dao);
    }
    
}

package com.edesa.dao.dtpl.master;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edesa.model.dtpl.master.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
 
    public List<UserInfo> findByRoleIdAndResidenceIdAndBusinessUnitId(Long roleId, Long residenceId, Long businessUnitId);
    
}

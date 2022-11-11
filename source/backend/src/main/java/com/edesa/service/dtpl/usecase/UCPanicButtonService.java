package com.edesa.service.dtpl.usecase;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edesa.controller.standard.dtpl.usecase.model.PanicButtonPushInfo;
import com.edesa.dao.dtpl.master.ResidenceRepository;
import com.edesa.dao.dtpl.master.UserInfoRepository;
import com.edesa.dao.dtpl.master.UserRepository;
import com.edesa.dao.dtpl.transaction.IssueRepository;
import com.edesa.dao.dtpl.transaction.IssueUpdateRepository;
import com.edesa.exception.EDesaException;
import com.edesa.model.dtpl.master.User;
import com.edesa.model.dtpl.master.UserInfo;
import com.edesa.model.dtpl.transaction.Issue;
import com.edesa.model.dtpl.transaction.IssueUpdate;

@Service
public class UCPanicButtonService {
    
    
    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private IssueUpdateRepository issueUpdateRepository;

    @Autowired
    private ResidenceRepository residenceRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private UserRepository userRepository;

    private static Long BUSINESS_UNIT_SECURITY = 2l;
    

    @Transactional
    public Issue pushPanicButton( PanicButtonPushInfo buatLaporanInfo) {

        if(!residenceRepository.existsById(buatLaporanInfo.getResidenceId())) {
            throw new EDesaException("residence dengan id '" +  buatLaporanInfo.getResidenceId() +"' tidak ditemukan");
        }

        if(!userRepository.existsById(buatLaporanInfo.getReporterId())) {
            throw new EDesaException("user dengan id '" +  buatLaporanInfo.getReporterId() +"' tidak ditemukan");
        }

        Issue issue = new Issue();
        issue.setCreatedBy(buatLaporanInfo.getReporterId());
        issue.setCreatedTime(new Timestamp(System.currentTimeMillis()));
        issue.setDescription("[WARNING !!!!] " + buatLaporanInfo.getDescription());
        issue.setCoordinate(null);
        issue.setStatus(Issue.STATUS_NEW);

        issueRepository.save(issue);

        IssueUpdate issueUpdate = new IssueUpdate();
        issueUpdate.setComment("[WARNING !!!!] Laporan telah dibuat");
        issueUpdate.setIssueId(issue.getId());
        issueUpdate.setUpdateById(buatLaporanInfo.getReporterId());
        issueUpdate.setUpdateTime(new Timestamp(System.currentTimeMillis()));
        issueUpdate.setStatus(Issue.STATUS_NEW);
        issueUpdate.setTransition("-> New");

        issueUpdateRepository.save(issueUpdate);

        issue.setBusinessUnitId(BUSINESS_UNIT_SECURITY);
        issue.setResidenceId(buatLaporanInfo.getResidenceId());
        issue.setStatus(Issue.STATUS_OPEN);

        List<UserInfo> userInfos = userInfoRepository.findByRoleIdAndResidenceIdAndBusinessUnitId(2l, buatLaporanInfo.getResidenceId(), 
            BUSINESS_UNIT_SECURITY);

        if(userInfos == null || userInfos.isEmpty()) {
            throw new EDesaException("tidak ada perangkat desa / petugas keamanan dan residence yang dipilih.");
        }

        User assignee = userRepository.findByUserInfoId(userInfos.get(0).getId());
        issue.setAssignee(assignee.getId());
        issue.setAssigneeInfo(assignee);

        issueRepository.save(issue);

        issueUpdate = new IssueUpdate();
        issueUpdate.setComment("[WARNING !!!!] Penugasan telah dilakukan");
        issueUpdate.setIssueId(issue.getId());
        issueUpdate.setUpdateById(buatLaporanInfo.getReporterId());
        issueUpdate.setUpdateTime(new Timestamp(System.currentTimeMillis()));
        issueUpdate.setStatus(Issue.STATUS_OPEN);
        issueUpdate.setTransition("New -> Open");

        issueUpdateRepository.save(issueUpdate);
        
        return issue;
    }

}

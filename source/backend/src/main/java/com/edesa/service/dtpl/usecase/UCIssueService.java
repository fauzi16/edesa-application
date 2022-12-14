package com.edesa.service.dtpl.usecase;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edesa.controller.standard.dtpl.usecase.model.CommentIssueInfo;
import com.edesa.controller.standard.dtpl.usecase.model.PenugasanLaporanInfo;
import com.edesa.controller.standard.dtpl.usecase.model.PostLaporanInfo;
import com.edesa.controller.standard.dtpl.usecase.model.WargaBuatLaporanInfo;
import com.edesa.dao.dtpl.master.BusinessUnitRepository;
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
public class UCIssueService {
    

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private IssueUpdateRepository issueUpdateRepository;

    @Autowired
    private BusinessUnitRepository businessUnitRepository;

    @Autowired
    private ResidenceRepository residenceRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Issue addComment(CommentIssueInfo commentIssueInfo) {
        IssueUpdate issueUpdate = new IssueUpdate();

        if(!issueRepository.existsById(commentIssueInfo.getIssueId())) {
            throw new EDesaException("Laporan dengan id '" + commentIssueInfo.getIssueId() +"' tidak ditemukan");
        }

        if(!userRepository.existsById(commentIssueInfo.getCommentBy())) {
            throw new EDesaException("User dengan id '" + commentIssueInfo.getCommentBy() +"' tidak ditemukan");
        }

        issueUpdate.setComment(commentIssueInfo.getComment());
        issueUpdate.setIssueId(commentIssueInfo.getIssueId());
        issueUpdate.setUpdateById(commentIssueInfo.getIssueId());
        issueUpdate.setUpdateTime(new Timestamp(System.currentTimeMillis()));

        issueUpdateRepository.save(issueUpdate);

        Issue issue = issueRepository.findById(commentIssueInfo.getIssueId()).get();

        return issue;
    }

    @Transactional
    public Issue step1BuatLaporanOlehWarga(WargaBuatLaporanInfo buatLaporanInfo) {
        Issue issue = new Issue();
        issue.setCreatedBy(buatLaporanInfo.getReporterId());
        issue.setCreatedTime(new Timestamp(System.currentTimeMillis()));
        issue.setDescription(buatLaporanInfo.getDescription());
        issue.setCoordinate(buatLaporanInfo.getCoordinate());
        issue.setStatus(Issue.STATUS_NEW);

        issueRepository.save(issue);

        IssueUpdate issueUpdate = new IssueUpdate();
        issueUpdate.setComment("Laporan telah dibuat");
        issueUpdate.setIssueId(issue.getId());
        issueUpdate.setUpdateById(buatLaporanInfo.getReporterId());
        issueUpdate.setUpdateTime(new Timestamp(System.currentTimeMillis()));
        issueUpdate.setStatus(Issue.STATUS_NEW);
        issueUpdate.setTransition("-> New");

        issueUpdateRepository.save(issueUpdate);

        return issue;
    }

    @Transactional
    public Issue step2PenugasanLaporanOlehAdmin(PenugasanLaporanInfo penugasanLaporanInfo) {
        

        if(!issueRepository.existsById(penugasanLaporanInfo.getIssueId())) {
            throw new EDesaException("Issue dengan id '" + penugasanLaporanInfo.getIssueId() +"' tidak ditemukan");
        }

        if(!businessUnitRepository.existsById(penugasanLaporanInfo.getBusinessUnitId())) {
            throw new EDesaException("business unit dengan id '" + penugasanLaporanInfo.getBusinessUnitId() + "' tidak ditemukan");
        }

        if(!residenceRepository.existsById(penugasanLaporanInfo.getResidenceId())) {
            throw new EDesaException("residence dengan id '" +  penugasanLaporanInfo.getResidenceId() +"' tidak ditemukan");
        }

        Issue issue = issueRepository.findById(penugasanLaporanInfo.getIssueId()).get();

        issue.setBusinessUnitId(penugasanLaporanInfo.getBusinessUnitId());
        issue.setResidenceId(penugasanLaporanInfo.getResidenceId());
        issue.setStatus(Issue.STATUS_OPEN);

        List<UserInfo> userInfos = userInfoRepository.findByRoleIdAndResidenceIdAndBusinessUnitId(2l, penugasanLaporanInfo.getResidenceId(), 
            penugasanLaporanInfo.getBusinessUnitId());

        if(userInfos == null || userInfos.isEmpty()) {
            throw new EDesaException("tidak ada perangkat desa dengan business unit dan residence yang dipilih.");
        }

        User assignee = userRepository.findByUserInfoId(userInfos.get(0).getId());
        issue.setAssignee(assignee.getId());
        issue.setAssigneeInfo(assignee);  
        
        User assignedBy = userRepository.findByUserInfoId(penugasanLaporanInfo.getAdminId());
        issue.setAssignedByInfo(assignedBy);
        issue.setAssignedBy(penugasanLaporanInfo.getAdminId());

        issueRepository.save(issue);

        IssueUpdate issueUpdate = new IssueUpdate();
        issueUpdate.setComment("Penugasan telah dilakukan");
        issueUpdate.setIssueId(issue.getId());
        issueUpdate.setUpdateById(assignedBy.getId());
        issueUpdate.setUpdateTime(new Timestamp(System.currentTimeMillis()));
        issueUpdate.setStatus(Issue.STATUS_OPEN);
        issueUpdate.setTransition("New -> Open");

        issueUpdateRepository.save(issueUpdate);
        
        return issue;
    }

    @Transactional
    public Issue step3InProgressLaporanOlehPetugasDesa(PostLaporanInfo laporanInfo) {

        if(!issueRepository.existsById(laporanInfo.getIssueId())) {
            throw new EDesaException("Laporan dengan id '" + laporanInfo.getIssueId() +"' tidak ditemukan");
        }

        Issue issue = issueRepository.findById(laporanInfo.getIssueId()).get();
        issue.setStatus(Issue.STATUS_INPROGRESS);

        IssueUpdate issueUpdate = new IssueUpdate();
        issueUpdate.setComment("Laporan sedang dikerjakan");
        issueUpdate.setIssueId(issue.getId());
        issueUpdate.setUpdateById(issue.getAssignee());
        issueUpdate.setUpdateTime(new Timestamp(System.currentTimeMillis()));
        issueUpdate.setStatus(Issue.STATUS_INPROGRESS);
        issueUpdate.setTransition("Open -> Inprogress");
        
        issueUpdateRepository.save(issueUpdate);
        issueRepository.save(issue);
        
        return issue;
    }

    @Transactional
    public Issue step4CloseLaporanOlehPerangkatDesa(PostLaporanInfo laporanInfo) {
        if(!issueRepository.existsById(laporanInfo.getIssueId())) {
            throw new EDesaException("Laporan dengan id '" + laporanInfo.getIssueId() +"' tidak ditemukan");
        }

        Issue issue = issueRepository.findById(laporanInfo.getIssueId()).get();

        issue.setStatus(Issue.STATUS_DONE);

        IssueUpdate issueUpdate = new IssueUpdate();
        issueUpdate.setComment("Laporan telah selesai dikerjakan");
        issueUpdate.setIssueId(issue.getId());
        issueUpdate.setUpdateById(issue.getAssignee());
        issueUpdate.setUpdateTime(new Timestamp(System.currentTimeMillis()));
        issueUpdate.setStatus(Issue.STATUS_DONE);
        issueUpdate.setTransition("Inprogress -> Done");
        
        issueUpdateRepository.save(issueUpdate);
        issueRepository.save(issue);
        
        return issue;
    }

    @Transactional
    public Issue step5CloseLaporanOlehAdmin(PostLaporanInfo laporanInfo) {
        if(!issueRepository.existsById(laporanInfo.getIssueId())) {
            throw new EDesaException("Laporan dengan id '" + laporanInfo.getIssueId() +"' tidak ditemukan");
        }

        Issue issue = issueRepository.findById(laporanInfo.getIssueId()).get();

        issue.setStatus(Issue.STATUS_CLOSED);

        IssueUpdate issueUpdate = new IssueUpdate();
        issueUpdate.setComment("Laporan telah ditutup");
        issueUpdate.setIssueId(issue.getId());
        issueUpdate.setUpdateById(issue.getAssignedBy());
        issueUpdate.setUpdateTime(new Timestamp(System.currentTimeMillis()));
        issueUpdate.setStatus(Issue.STATUS_CLOSED);
        issueUpdate.setTransition("Done -> Closed");
        
        issueUpdateRepository.save(issueUpdate);
        issueRepository.save(issue);
        
        return issue;
    }

}

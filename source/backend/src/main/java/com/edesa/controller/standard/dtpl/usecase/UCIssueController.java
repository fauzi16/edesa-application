package com.edesa.controller.standard.dtpl.usecase;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.edesa.controller.standard.dtpl.BaseController;
import com.edesa.controller.standard.dtpl.usecase.model.CloseLaporanInfo;
import com.edesa.controller.standard.dtpl.usecase.model.PenugasanLaporanInfo;
import com.edesa.controller.standard.dtpl.usecase.model.ReopenLaporanInfo;
import com.edesa.controller.standard.dtpl.usecase.model.WargaBuatLaporanInfo;
import com.edesa.dao.dtpl.master.BusinessUnitRepository;
import com.edesa.dao.dtpl.master.ResidenceRepository;
import com.edesa.dao.dtpl.master.UserInfoRepository;
import com.edesa.dao.dtpl.master.UserRepository;
import com.edesa.dao.dtpl.transaction.IssueRepository;
import com.edesa.dao.dtpl.transaction.IssueUpdateRepository;
import com.edesa.exception.EDesaException;
import com.edesa.model.dtpl.master.BusinessUnit;
import com.edesa.model.dtpl.master.Residence;
import com.edesa.model.dtpl.master.User;
import com.edesa.model.dtpl.master.UserInfo;
import com.edesa.model.dtpl.transaction.Issue;
import com.edesa.model.dtpl.transaction.IssueUpdate;

@RestController
@CrossOrigin
@RequestMapping(value="/issue")
public class UCIssueController extends BaseController {

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

    @RequestMapping(value = "/step1-buat-laporan-oleh-warga", method = RequestMethod.POST)
    public Issue step1BuatLaporanOlehWarga(@RequestBody WargaBuatLaporanInfo buatLaporanInfo) {
        Issue issue = new Issue();
        issue.setCreatedBy(buatLaporanInfo.getReporterId());
        issue.setCreatedTime(new Timestamp(System.currentTimeMillis()));
        issue.setDescription(buatLaporanInfo.getDescription());
        issue.setCoordinate(buatLaporanInfo.getCoordinate());
        issue.setStatus(Issue.STATUS_NEW);

        issueRepository.save(issue);

        return issue;
    }

    @RequestMapping(value = "/step2-penugasan-laporan-oleh-admin", method = RequestMethod.POST)
    public Issue step2PenugasanLaporanOlehAdmin(@RequestBody PenugasanLaporanInfo penugasanLaporanInfo) {
        Issue issue = issueRepository.findById(penugasanLaporanInfo.getIssueId()).get();
        BusinessUnit businessUnit = businessUnitRepository.findById(penugasanLaporanInfo.getBusinessUnitId()).get();
        Residence residence = residenceRepository.findById(penugasanLaporanInfo.getResidenceId()).get();

        if(issue == null) {
            throw new EDesaException("Issue dengan id '" + penugasanLaporanInfo.getIssueId() +"' tidak ditemukan");
        }

        if(businessUnit == null) {
            throw new EDesaException("business unit dengan id '" + penugasanLaporanInfo.getBusinessUnitId() + "' tidak ditemukan");
        }

        if(residence == null) {
            throw new EDesaException("residence dengan id '" +  penugasanLaporanInfo.getResidenceId() +"' tidak ditemukan");
        }

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
        
        return issue;
    }

    @RequestMapping(value = "/step3-close-laporan-oleh-petugas-desa", method = RequestMethod.POST)
    public Issue step3CloseLaporanOlehPetugasDesa(@RequestBody CloseLaporanInfo closeLaporanInfo) {
        Issue issue = issueRepository.findById(closeLaporanInfo.getIssueId()).get();

        if(issue == null) {
            throw new EDesaException("Issue dengan id '" + closeLaporanInfo.getIssueId() +"' tidak ditemukan");
        }

        issue.setStatus(Issue.STATUS_CLOSED);

        IssueUpdate issueUpdate = new IssueUpdate();
        issueUpdate.setComment(closeLaporanInfo.getComment());
        issueUpdate.setIssueId(issue.getId());
        issueUpdate.setUpdateById(issue.getAssignedBy());
        issueUpdate.setUpdateTime(new Timestamp(System.currentTimeMillis()));
        issueUpdate.setStatus("closed");
        
        issueUpdateRepository.save(issueUpdate);
        issueRepository.save(issue);
        
        return issue;
    }

    @RequestMapping(value = "/step4-reopen-laporan-oleh-warga", method = RequestMethod.POST)
    public Issue step4ReopenLaporanOlehWarga(@RequestBody ReopenLaporanInfo reopenLaporanInfo) {
        Issue issue = issueRepository.findById(reopenLaporanInfo.getIssueId()).get();

        if(issue == null) {
            throw new EDesaException("Issue dengan id '" + reopenLaporanInfo.getIssueId() +"' tidak ditemukan");
        }

        issue.setStatus(Issue.STATUS_OPEN);

        IssueUpdate issueUpdate = new IssueUpdate();
        issueUpdate.setComment(reopenLaporanInfo.getComment());
        issueUpdate.setIssueId(issue.getId());
        issueUpdate.setUpdateById(issue.getCreatedBy());
        issueUpdate.setUpdateTime(new Timestamp(System.currentTimeMillis()));

        int reopen = issue.getIssueUpdates().size() + 1 / 2;
        issueUpdate.setStatus("reopen-" + reopen);

        issueUpdateRepository.save(issueUpdate);
        issueRepository.save(issue);

        issue.getIssueUpdates().add(issueUpdate);

        return issue;
    }
    
}

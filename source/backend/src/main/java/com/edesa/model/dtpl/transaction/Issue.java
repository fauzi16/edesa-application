package com.edesa.model.dtpl.transaction;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.edesa.model.dtpl.master.BusinessUnit;
import com.edesa.model.dtpl.master.Residence;
import com.edesa.model.dtpl.master.User;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiModelProperty.AccessMode;

@Entity
@Table(name = "dtpl_trs_issue")
public class Issue {

    public final static String STATUS_NEW = "NEW";
    public final static String STATUS_OPEN = "OPEN";
    public final static String STATUS_INPROGRESS = "INPROGRESS";
    public final static String STATUS_DONE = "DONE";
    public final static String STATUS_CLOSED = "CLOSED";
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Timestamp createdTime;

    private String coordinate;
    private String description;
    private String status;
    
    @ManyToOne
    @ApiModelProperty(accessMode = AccessMode.READ_ONLY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @JoinColumn(name = "createdBy", referencedColumnName = "id", insertable = false, updatable = false)
    private User createdByInfo;
    private Long createdBy;

    @ManyToOne
    @ApiModelProperty(accessMode = AccessMode.READ_ONLY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @JoinColumn(name = "assignee", referencedColumnName = "id", insertable = false, updatable = false)
    private User assigneeInfo;
    private Long assignee;

    @ManyToOne
    @ApiModelProperty(accessMode = AccessMode.READ_ONLY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @JoinColumn(name = "assignedBy", referencedColumnName = "id", insertable = false, updatable = false)
    private User assignedByInfo;
    private Long assignedBy;

    @ManyToOne
    @ApiModelProperty(accessMode = AccessMode.READ_ONLY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @JoinColumn(name = "businessUnitId", referencedColumnName = "id", insertable = false, updatable = false)
    private BusinessUnit businessUnit;
    private Long businessUnitId;

    @ManyToOne
    @ApiModelProperty(accessMode = AccessMode.READ_ONLY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @JoinColumn(name = "residenceId", referencedColumnName = "id", insertable = false, updatable = false)
    private Residence residence;
    private Long residenceId;

    @OneToMany(mappedBy = "issueId")
    @ApiModelProperty(accessMode = AccessMode.READ_ONLY)
    private List<IssueUpdate> issueUpdates;


    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Timestamp getCreatedTime() {
        return createdTime;
    }
    public void setCreatedTime(Timestamp createdTime) {
        this.createdTime = createdTime;
    }
    public User getCreatedByInfo() {
        return createdByInfo;
    }
    public void setCreatedByInfo(User createdByInfo) {
        this.createdByInfo = createdByInfo;
    }
    public Long getCreatedBy() {
        return createdBy;
    }
    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }
    public User getAssigneeInfo() {
        return assigneeInfo;
    }
    public void setAssigneeInfo(User assigneeInfo) {
        this.assigneeInfo = assigneeInfo;
    }
    public Long getAssignee() {
        return assignee;
    }
    public void setAssignee(Long assignee) {
        this.assignee = assignee;
    }
    public User getAssignedByInfo() {
        return assignedByInfo;
    }
    public void setAssignedByInfo(User assignedByInfo) {
        this.assignedByInfo = assignedByInfo;
    }
    public Long getAssignedBy() {
        return assignedBy;
    }
    public void setAssignedBy(Long assignedBy) {
        this.assignedBy = assignedBy;
    }
    public List<IssueUpdate> getIssueUpdates() {
        return issueUpdates;
    }
    public void setIssueUpdates(List<IssueUpdate> issueUpdates) {
        this.issueUpdates = issueUpdates;
    }
    public BusinessUnit getBusinessUnit() {
        return businessUnit;
    }
    public void setBusinessUnit(BusinessUnit businessUnit) {
        this.businessUnit = businessUnit;
    }
    public Long getBusinessUnitId() {
        return businessUnitId;
    }
    public void setBusinessUnitId(Long businessUnitId) {
        this.businessUnitId = businessUnitId;
    }
    public Residence getResidence() {
        return residence;
    }
    public void setResidence(Residence residence) {
        this.residence = residence;
    }
    public Long getResidenceId() {
        return residenceId;
    }
    public void setResidenceId(Long residenceId) {
        this.residenceId = residenceId;
    }
    public String getCoordinate() {
        return coordinate;
    }
    public void setCoordinate(String coordinate) {
        this.coordinate = coordinate;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

}

package com.edesa.model.dtpl.master;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiModelProperty.AccessMode;

@Entity
@Table(name = "dtpl_mst_cctv")
public class CCTV {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    @Column(columnDefinition="TEXT")
    private String description;

    @ManyToOne
    @ApiModelProperty(accessMode = AccessMode.READ_ONLY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @JoinColumn(name = "residenceId", referencedColumnName = "id", insertable = false, updatable = false)
    private Residence residence;
    private Long residenceId;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
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
    

}

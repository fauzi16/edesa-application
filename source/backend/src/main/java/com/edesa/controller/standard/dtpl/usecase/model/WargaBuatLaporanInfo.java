package com.edesa.controller.standard.dtpl.usecase.model;

public class WargaBuatLaporanInfo {
    
    private Long reporterId;
    private String coordinate;
    private String description;

    
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
    public Long getReporterId() {
        return reporterId;
    }
    public void setReporterId(Long reporterId) {
        this.reporterId = reporterId;
    }
    
}

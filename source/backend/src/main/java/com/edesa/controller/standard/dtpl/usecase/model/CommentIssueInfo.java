package com.edesa.controller.standard.dtpl.usecase.model;

public class CommentIssueInfo {
    
    private Long issueId;
    private String comment;
    private Long commentBy;
    
    public Long getIssueId() {
        return issueId;
    }
    public void setIssueId(Long issueId) {
        this.issueId = issueId;
    }
    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }
    public Long getCommentBy() {
        return commentBy;
    }
    public void setCommentBy(Long commentBy) {
        this.commentBy = commentBy;
    }

    

}

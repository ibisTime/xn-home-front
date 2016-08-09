package com.xnjr.home.front.req;

public class XN704100Req {

    // 姓名（必填）
    private String person;

    // 留言内容（必填）
    private String content1;

    public String getPerson() {
        return person;
    }

    public void setPerson(String person) {
        this.person = person;
    }

    public String getContent1() {
        return content1;
    }

    public void setContent1(String content1) {
        this.content1 = content1;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    // 公司编号（必填）
    private String companyCode;

}

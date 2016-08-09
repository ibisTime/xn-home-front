package com.xnjr.home.front.ao;

public interface INewsAO {
    /**
     * 查询新闻列表
     * @param code
     * @param keyword
     * @param type
     * @param status
     * @param companyCode
     * @param creator
     * @param author
     * @return 
     * @history:
     */
    public Object queryNewsList(String code, String keyword, String type,
            String status, String companyCode, String creator, String author);

    public Object queryNewsPage(String code, String keyword, String type,
            String status, String companyCode, String creator, String author,
            String orderColumn, String orderDir, String start, String limit);

}

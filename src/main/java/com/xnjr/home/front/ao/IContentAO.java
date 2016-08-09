package com.xnjr.home.front.ao;

public interface IContentAO {

    Object doGetAContentPage(String code, String type, String title,
            String orderColumn, String orderDir, String start, String limit,
            String menuCode);

    Object doGetAContentList(String code, String type, String title,
            String menuCode);

}

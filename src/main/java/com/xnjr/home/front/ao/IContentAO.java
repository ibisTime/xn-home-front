package com.xnjr.home.front.ao;

public interface IContentAO {

	Object doGetAContentPage(String kind, String type, String title,
            String menuCode, String start, String limit);

	Object doGetAContentList(String kind, String type, String title,
            String menuCode);
	
	Object doGetAContent(String code);

}

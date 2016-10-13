package com.xnjr.home.front.req;

public class XN806111Req {
	//种类
	private String kind;
	//类别	0 不可 1可以
	private String type;
	//内容标题
	private String title;
	//菜单编号
	private String menuCode;
	
	public String getKind() {
		return kind;
	}
	public void setKind(String kind) {
		this.kind = kind;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getMenuCode() {
		return menuCode;
	}
	public void setMenuCode(String menuCode) {
		this.menuCode = menuCode;
	}
}

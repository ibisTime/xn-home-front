package com.xnjr.home.front.ao.impl;


import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IBannerAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN806053Req;

@Service
public class BannerAOImpl implements IBannerAO {

	@Override
	public Object getBannerList(String name, String parentCode, String companyCode) {
		XN806053Req req = new XN806053Req();
        req.setName(name);
        req.setType("2");
        req.setStatus("1");
        req.setParentCode(parentCode);
        req.setCompanyCode(companyCode);
        return BizConnecter.getBizData("806053", JsonUtils.object2Json(req),
            Object.class);
	}

}

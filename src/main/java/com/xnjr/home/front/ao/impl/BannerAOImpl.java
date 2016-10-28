package com.xnjr.home.front.ao.impl;


import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IBannerAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN806051Req;

@Service
public class BannerAOImpl implements IBannerAO {

	@Override
	public Object getBannerList(String companyCode, String location) {
		XN806051Req req = new XN806051Req();
        req.setType("2");
        req.setCompanyCode(companyCode);
        req.setLocation(location);
        return BizConnecter.getBizData("806051", JsonUtils.object2Json(req),
            Object.class);
	}

}

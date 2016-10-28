package com.xnjr.home.front.ao.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IMenuAO;
import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN806051Req;

@Service
public class MenuAOImpl implements IMenuAO {

    public Object doGetMenuList(String companyCode, String location) {
        if (StringUtils.isBlank(companyCode)) {
            throw new BizException("A010001", "公司编号不能为空");
        }
        XN806051Req req = new XN806051Req();
        req.setType("1");
        req.setParentCode("");
        req.setLocation(location);
        req.setCompanyCode(companyCode);
        return BizConnecter.getBizData("806051", JsonUtils.object2Json(req),
            Object.class);
    }
}

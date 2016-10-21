package com.xnjr.home.front.ao.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IMenuAO;
import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN806053Req;

@Service
public class MenuAOImpl implements IMenuAO {

    public Object doGetMenuList(String name, String location, String contentType,
            String companyCode) {
        if (StringUtils.isBlank(companyCode)) {
            throw new BizException("A010001", "公司编号不能为空");
        }
        XN806053Req req = new XN806053Req();
        req.setName(name);
        req.setType("1");
        req.setStatus("1");
        req.setLocation(location);
        req.setParentCode("");
        req.setContentType(contentType);
        req.setCompanyCode(companyCode);
        return BizConnecter.getBizData("806053", JsonUtils.object2Json(req),
            Object.class);
    }
}

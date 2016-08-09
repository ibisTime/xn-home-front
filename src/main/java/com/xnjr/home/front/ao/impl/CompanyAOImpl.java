package com.xnjr.home.front.ao.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.ICompanyAO;
import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN704004Req;
import com.xnjr.home.front.req.XN704204Req;
import com.xnjr.home.front.res.XN704004Res;

@Service
public class CompanyAOImpl implements ICompanyAO {

    @Override
    public XN704004Res doGetCompany(String code) {
        if (StringUtils.isBlank(code)) {
            throw new BizException("A010001", "公司编号不能为空");
        }
        XN704004Req req = new XN704004Req();
        req.setCode(code);
        XN704004Res rtnObject = BizConnecter.getBizData("704004",
            JsonUtils.object2Json(req), XN704004Res.class);
        return rtnObject;
    }

    public Object doGetCompanyIdeas(String code, String companyCode) {
        if (StringUtils.isBlank(companyCode)) {
            throw new BizException("A010001", "公司编号不能为空");
        }
        XN704204Req req = new XN704204Req();
        req.setCompanyCode(companyCode);
        req.setCode(code);
        return BizConnecter.getBizData("704204", JsonUtils.object2Json(req),
            Object.class);
    }

}

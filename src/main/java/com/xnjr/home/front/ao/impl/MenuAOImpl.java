package com.xnjr.home.front.ao.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IMenuAO;
import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN704307Req;

@Service
public class MenuAOImpl implements IMenuAO {

    public Object doGetMenuList(String code, String status, String templetCode,
            String parentCode, String contentType, String contentSource,
            String companyCode) {
        if (StringUtils.isBlank(companyCode)) {
            throw new BizException("A010001", "公司编号不能为空");
        }
        XN704307Req req = new XN704307Req();
        req.setCode(code);
        req.setCompanyCode(companyCode);
        req.setContentType(contentType);
        req.setParentCode(parentCode);
        req.setStatus("1");
        req.setTempletCode(templetCode);
        return BizConnecter.getBizData("704307", JsonUtils.object2Json(req),
            Object.class);
    }
}

package com.xnjr.home.front.ao.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IProductAO;
import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN704008Req;
import com.xnjr.home.front.req.XN704009Req;
import com.xnjr.home.front.res.Page;

@Service
public class ProductAOImpl implements IProductAO {

    @Override
    public List queryProductList(String code, String name, String kind,
            String status, String companyCode) {
        if (StringUtils.isBlank(companyCode)) {
            throw new BizException("A010001", "公司编号不能为空");
        }
        XN704009Req req = new XN704009Req();
        req.setCode(code);
        req.setName(name);
        req.setKind(kind);
        req.setStatus("1");
        req.setCompanyCode(companyCode);
        return BizConnecter.getBizData("704009", JsonUtils.object2Json(req),
            List.class);
    }

    @Override
    public Page queryProductPage(String code, String name, String kind,
            String status, String start, String limit, String orderColumn,
            String orderDir) {
        if (StringUtils.isBlank(start)) {
            throw new BizException("A010001", "页数不能为空");
        }
        if (StringUtils.isBlank(limit)) {
            throw new BizException("A010001", "限制条数不能为空");
        }
        XN704008Req req = new XN704008Req();
        req.setCode(code);
        req.setName(name);
        req.setKind(kind);
        req.setStatus(status);

        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("704008", JsonUtils.object2Json(req),
            Page.class);
    }

}

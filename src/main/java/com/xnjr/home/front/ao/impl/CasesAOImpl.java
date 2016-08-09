package com.xnjr.home.front.ao.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.ICasesAO;
import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN704018Req;
import com.xnjr.home.front.req.XN704019Req;
import com.xnjr.home.front.res.Page;

@Service
public class CasesAOImpl implements ICasesAO {

    @Override
    public Page queryCasePage(String code, String name, String dateStart,
            String dateEnd, String start, String limit, String orderColumn,
            String orderDir, String companyCode) {
        if (StringUtils.isBlank(start)) {
            throw new BizException("A010001", "页数不能为空");
        }
        if (StringUtils.isBlank(limit)) {
            throw new BizException("A010001", "限制条数不能为空");
        }
        if (StringUtils.isBlank(companyCode)) {
            throw new BizException("A010001", "公司编号不能为空");
        }
        XN704018Req req = new XN704018Req();
        req.setCode(code);
        req.setName(name);
        req.setCompanyCode(companyCode);

        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("704018", JsonUtils.object2Json(req),
            Page.class);
    }

    @Override
    public List queryCaseList(String code, String name, String dateStart,
            String dateEnd, String companyCode) {
        if (StringUtils.isBlank(companyCode)) {
            throw new BizException("A010001", "公司编号不能为空");
        }
        XN704019Req req = new XN704019Req();
        req.setCode(code);
        req.setName(name);
        req.setDateStart(dateStart);
        req.setDateEnd(dateEnd);
        req.setCompanyCode(companyCode);

        return BizConnecter.getBizData("704019", JsonUtils.object2Json(req),
            List.class);
    }

}

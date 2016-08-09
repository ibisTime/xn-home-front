package com.xnjr.home.front.ao.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IWorkerAO;
import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN704033Req;
import com.xnjr.home.front.req.XN704034Req;
import com.xnjr.home.front.res.Page;

@Service
public class WorkerAOImpl implements IWorkerAO {

    @Override
    public List queryWorkerList(String code, String name, String status,
            String companyCode) {
        if (StringUtils.isBlank(companyCode)) {
            throw new BizException("A010001", "公司编号不能为空");
        }
        XN704034Req req = new XN704034Req();
        req.setCode(code);
        req.setName(name);
        req.setStatus(status);
        req.setCompanyCode(companyCode);
        return BizConnecter.getBizData("704034", JsonUtils.object2Json(req),
            List.class);
    }

    @Override
    public Page queryWorkerPage(String code, String name, String status,
            String start, String limit, String orderColumn, String orderDir) {
        if (StringUtils.isBlank(start)) {
            throw new BizException("A010001", "页数不能为空");
        }
        if (StringUtils.isBlank(limit)) {
            throw new BizException("A010001", "限制条数不能为空");
        }
        XN704033Req req = new XN704033Req();
        req.setCode(code);
        req.setName(name);
        req.setStatus(status);

        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("704033", JsonUtils.object2Json(req),
            Page.class);
    }

}

package com.xnjr.home.front.ao.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IPositionAO;
import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN704023Req;
import com.xnjr.home.front.req.XN704024Req;
import com.xnjr.home.front.res.Page;

@Service
public class PositionAOImpl implements IPositionAO {

    @Override
    public Page queryPositionPage(String code, String name, String status,
            String start, String limit, String orderColumn, String orderDir) {
        if (StringUtils.isBlank(start)) {
            throw new BizException("A010001", "页数不能为空");
        }
        if (StringUtils.isBlank(limit)) {
            throw new BizException("A010001", "限制条数不能为空");
        }
        XN704023Req req = new XN704023Req();
        req.setCode(code);
        req.setName(name);
        req.setStatus(status);
        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("704023", JsonUtils.object2Json(req),
            Page.class);
    }

    @Override
    public List queryPositionList(String code, String name, String status) {
        XN704024Req req = new XN704024Req();
        req.setCode(code);
        req.setName(name);
        req.setStatus(status);
        return BizConnecter.getBizData("704024", JsonUtils.object2Json(req),
            List.class);
    }

}

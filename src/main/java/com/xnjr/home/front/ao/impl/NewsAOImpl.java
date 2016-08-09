package com.xnjr.home.front.ao.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.INewsAO;
import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN704038Req;
import com.xnjr.home.front.req.XN704039Req;

@Service
public class NewsAOImpl implements INewsAO {

    @Override
    public Object queryNewsList(String code, String keyword, String type,
            String status, String companyCode, String creator, String author) {
        XN704039Req req = new XN704039Req();
        req.setCode(code);
        req.setAuthor(author);
        req.setCompanyCode(companyCode);
        req.setCreator(creator);
        req.setKeyword(keyword);
        req.setStatus(status);
        req.setType(type);
        return BizConnecter.getBizData("704039", JsonUtils.object2Json(req),
            Object.class);
    }

    public Object queryNewsPage(String code, String keyword, String type,
            String status, String companyCode, String creator, String author,
            String orderColumn, String orderDir, String start, String limit) {
        if (StringUtils.isBlank(start)) {
            throw new BizException("A010001", "开始编号不能为空");
        }
        if (StringUtils.isBlank(limit)) {
            throw new BizException("A010001", "每页显示个数不能为空");
        }
        XN704038Req req = new XN704038Req();
        req.setCode(code);
        req.setAuthor(author);
        req.setCompanyCode(companyCode);
        req.setCreator(creator);
        req.setKeyword(keyword);
        req.setStatus(status);
        req.setType(type);
        req.setLimit(limit);
        req.setStart(start);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("704038", JsonUtils.object2Json(req),
            Object.class);
    }
}

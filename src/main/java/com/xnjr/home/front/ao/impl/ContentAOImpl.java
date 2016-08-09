package com.xnjr.home.front.ao.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IContentAO;
import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN704304Req;
import com.xnjr.home.front.req.XN704305Req;

@Service
public class ContentAOImpl implements IContentAO {

    @Override
    public Object doGetAContentPage(String code, String type, String title,
            String orderColumn, String orderDir, String start, String limit,
            String menuCode) {
        if (StringUtils.isBlank(start)) {
            throw new BizException("A010001", "开始编号不能为空");
        }
        if (StringUtils.isBlank(limit)) {
            throw new BizException("A010001", "每页显示个数不能为空");
        }
        if (StringUtils.isBlank(menuCode)) {
            throw new BizException("A010001", "菜单编号不能为空");
        }
        XN704304Req req = new XN704304Req();
        req.setCode(code);
        req.setTitle(title);
        req.setType(type);
        req.setLimit(limit);
        req.setStart(start);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        req.setMenuCode(menuCode);
        return BizConnecter.getBizData("704304", JsonUtils.object2Json(req),
            Object.class);
    }

    public Object doGetAContentList(String code, String type, String title,
            String menuCode) {
        if (StringUtils.isBlank(menuCode)) {
            throw new BizException("A010001", "菜单编号不能为空");
        }
        XN704305Req req = new XN704305Req();
        req.setCode(code);
        req.setTitle(title);
        req.setType(type);
        req.setMenuCode(menuCode);
        return BizConnecter.getBizData("704305", JsonUtils.object2Json(req),
            Object.class);
    }

}

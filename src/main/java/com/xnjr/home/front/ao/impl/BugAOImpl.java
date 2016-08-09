package com.xnjr.home.front.ao.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IBugAO;
import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN704025Req;
import com.xnjr.home.front.req.XN704028Req;
import com.xnjr.home.front.req.XN704029Req;
import com.xnjr.home.front.res.Page;
import com.xnjr.home.front.res.XN704025Res;

@Service
public class BugAOImpl implements IBugAO {

    @Override
    public XN704025Res doReportBug(String module, String topic, String content,
            String attachment, String alipay, String period) {
        XN704025Req req = new XN704025Req();
        req.setModule(module);
        req.setTopic(topic);
        req.setContent(content);
        req.setAttachment(attachment);
        req.setAlipay(alipay);
        req.setPeriod(period);
        return BizConnecter.getBizData("704025", JsonUtils.object2Json(req),
            XN704025Res.class);
    }

    @Override
    public Page queryBugPage(String alipay, String period, String status,
            String dateStart, String dateEnd, String start, String limit,
            String orderColumn, String orderDir) {
        if (StringUtils.isBlank(start)) {
            throw new BizException("A010001", "页数不能为空");
        }
        if (StringUtils.isBlank(limit)) {
            throw new BizException("A010001", "限制条数不能为空");
        }
        XN704028Req req = new XN704028Req();
        req.setAlipay(alipay);
        req.setPeriod(period);
        req.setStatus(status);
        req.setDateStart(dateStart);
        req.setDateEnd(dateEnd);

        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("704028", JsonUtils.object2Json(req),
            Page.class);
    }

    @Override
    public List queryBugList(String alipay, String period, String status,
            String dateStart, String dateEnd) {
        XN704029Req req = new XN704029Req();
        req.setAlipay(alipay);
        req.setPeriod(period);
        req.setStatus(status);
        req.setDateStart(dateStart);
        req.setDateEnd(dateEnd);

        return BizConnecter.getBizData("704029", JsonUtils.object2Json(req),
            List.class);
    }

}

package com.xnjr.home.front.ao.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IPartnerAO;
import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN704013Req;
import com.xnjr.home.front.req.XN704014Req;
import com.xnjr.home.front.req.XN704100Req;
import com.xnjr.home.front.req.XN704104Req;
import com.xnjr.home.front.req.XN704105Req;
import com.xnjr.home.front.req.XN704106Req;
import com.xnjr.home.front.res.Page;

@Service
public class PartnerAOImpl implements IPartnerAO {

    @Override
    public Page queryPartnerPage(String code, String name, String start,
            String limit, String orderColumn, String orderDir) {
        if (StringUtils.isBlank(start)) {
            throw new BizException("A010001", "页数不能为空");
        }
        if (StringUtils.isBlank(limit)) {
            throw new BizException("A010001", "限制条数不能为空");
        }
        XN704013Req req = new XN704013Req();
        req.setCode(code);
        req.setName(name);

        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("704013", JsonUtils.object2Json(req),
            Page.class);

    }

    @Override
    public List queryPartnerList(String code, String name) {
        XN704014Req req = new XN704014Req();
        req.setCode(code);
        req.setName(name);

        return BizConnecter.getBizData("704014", JsonUtils.object2Json(req),
            List.class);
    }

    public Object addPartner(String organization, String person,
            String contact, String content1, String companyCode, String type,
            String organizationDesc) {
        if (StringUtils.isBlank(companyCode)) {
            throw new BizException("A010001", "公司编号不能为空");
        }
        if (StringUtils.isBlank(organization)) {
            throw new BizException("A010001", "公司名称不能为空");
        }
        if (StringUtils.isBlank(person)) {
            throw new BizException("A010001", "联系人不能为空");
        }
        if (StringUtils.isBlank(contact)) {
            throw new BizException("A010001", "联系方式不能为空");
        }
        if (StringUtils.isBlank(content1)) {
            throw new BizException("A010001", "意向描述不能为空");
        }
        XN704105Req req = new XN704105Req();
        req.setCompanyCode(companyCode);
        req.setContact(contact);
        req.setContent1(content1);
        req.setOrganization(organization);
        req.setOrganizationDesc(organizationDesc);
        req.setPerson(person);
        req.setType(type);
        return BizConnecter.getBizData("704105", JsonUtils.object2Json(req),
            Object.class);
    }

    public Object addBuyCarPartner(String person, String personDesc,
            String contact, String content1, String companyCode,
            String content2, String remark) {
        if (StringUtils.isBlank(companyCode)) {
            throw new BizException("A010001", "公司编号不能为空");
        }
        if (StringUtils.isBlank(personDesc)) {
            throw new BizException("A010001", "年龄不能为空");
        }
        if (StringUtils.isBlank(person)) {
            throw new BizException("A010001", "联系人不能为空");
        }
        if (StringUtils.isBlank(contact)) {
            throw new BizException("A010001", "联系方式不能为空");
        }
        if (StringUtils.isBlank(content1)) {
            throw new BizException("A010001", "意向描述不能为空");
        }
        if (StringUtils.isBlank(content2)) {
            throw new BizException("A010001", "车价不能为空");
        }
        if (StringUtils.isBlank(remark)) {
            throw new BizException("A010001", "所在地区不能为空");
        }
        XN704104Req req = new XN704104Req();
        req.setCompanyCode(companyCode);
        req.setContact(contact);
        req.setContent1(content1);
        req.setPerson(person);
        req.setContent2(content2);
        req.setPersonDesc(personDesc);
        req.setRemark(remark);
        return BizConnecter.getBizData("704104", JsonUtils.object2Json(req),
            Object.class);
    }

    public Object addOnlineMessage(String person, String content1,
            String companyCode) {
        if (StringUtils.isBlank(companyCode)) {
            throw new BizException("A010001", "公司编号不能为空");
        }
        if (StringUtils.isBlank(content1)) {
            throw new BizException("A010001", "意向描述不能为空");
        }
        XN704100Req req = new XN704100Req();
        req.setCompanyCode(companyCode);
        req.setContent1(content1);
        req.setPerson(person);
        return BizConnecter.getBizData("704100", JsonUtils.object2Json(req),
            Object.class);
    }

    public Object addResume(String content2, String content1, String companyCode) {
        if (StringUtils.isBlank(companyCode)) {
            throw new BizException("A010001", "公司编号不能为空");
        }
        if (StringUtils.isBlank(content2)) {
            throw new BizException("A010001", "简历不能为空");
        }
        XN704106Req req = new XN704106Req();
        req.setCompanyCode(companyCode);
        req.setContent1(content1);
        req.setContent2(content2);
        return BizConnecter.getBizData("704106", JsonUtils.object2Json(req),
            Object.class);
    }
}

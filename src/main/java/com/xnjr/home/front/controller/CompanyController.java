/**
 * @Title DemoController.java 
 * @Package com.ibis.pz.controller 
 * @Description 
 * @author miyb  
 * @date 2015-5-13 上午10:28:47 
 * @version V1.0   
 */
package com.xnjr.home.front.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.home.front.ao.ICasesAO;
import com.xnjr.home.front.ao.ICompanyAO;
import com.xnjr.home.front.ao.IContentAO;
import com.xnjr.home.front.ao.IMenuAO;
import com.xnjr.home.front.ao.INewsAO;
import com.xnjr.home.front.ao.IPartnerAO;
import com.xnjr.home.front.ao.IPositionAO;
import com.xnjr.home.front.ao.IProductAO;
import com.xnjr.home.front.ao.IWorkerAO;
import com.xnjr.home.front.res.Page;
import com.xnjr.home.front.res.XN704004Res;

/** 
 * @author: miyb 
 * @since: 2015-5-13 上午10:28:47 
 * @history:
 */
@Controller
@RequestMapping(value = "/company")
public class CompanyController {
    @Autowired
    ICasesAO casesAO;

    @Autowired
    ICompanyAO companyAO;

    @Autowired
    IPartnerAO partnerAO;

    @Autowired
    IPositionAO positionAO;

    @Autowired
    IProductAO productAO;

    @Autowired
    IWorkerAO workerAO;

    @Autowired
    INewsAO newsAO;

    @Autowired
    IMenuAO menuAO;

    @Autowired
    IContentAO contentAO;

    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public XN704004Res doGetCompany(
            @RequestParam("companyCode") String companyCode) {
        return companyAO.doGetCompany(companyCode);
    }

    @RequestMapping(value = "/product/page", method = RequestMethod.GET)
    @ResponseBody
    public Page queryProductPage(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "order_column", required = false) String orderColumn,
            @RequestParam(value = "order_dir", required = false) String orderDir) {
        return productAO.queryProductPage(code, name, kind, status, start,
            limit, orderColumn, orderDir);
    }

    @RequestMapping(value = "/product/list", method = RequestMethod.GET)
    @ResponseBody
    public List queryProductList(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam("companyCode") String companyCode) {
        return productAO
            .queryProductList(code, name, kind, status, companyCode);
    }

    @RequestMapping(value = "/partner/page", method = RequestMethod.GET)
    @ResponseBody
    public Page queryPartnerPage(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "order_column", required = false) String orderColumn,
            @RequestParam(value = "order_dir", required = false) String orderDir) {
        return partnerAO.queryPartnerPage(code, name, start, limit,
            orderColumn, orderDir);
    }

    @RequestMapping(value = "/partner/list", method = RequestMethod.GET)
    @ResponseBody
    public List queryPartnerList(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "name", required = false) String name) {
        return partnerAO.queryPartnerList(code, name);
    }

    @RequestMapping(value = "/case/page", method = RequestMethod.GET)
    @ResponseBody
    public Page queryCasePage(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "date_start", required = false) String dateStart,
            @RequestParam(value = "date_end", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "order_column", required = false) String orderColumn,
            @RequestParam(value = "order_dir", required = false) String orderDir,
            @RequestParam("companyCode") String companyCode) {

        return casesAO.queryCasePage(code, name, dateStart, dateEnd, start,
            limit, orderColumn, orderDir, companyCode);
    }

    @RequestMapping(value = "/case/list", method = RequestMethod.GET)
    @ResponseBody
    public List queryCaseList(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "date_start", required = false) String dateStart,
            @RequestParam(value = "date_end", required = false) String dateEnd,
            @RequestParam("companyCode") String companyCode) {
        return casesAO.queryCaseList(code, name, dateStart, dateEnd,
            companyCode);
    }

    @RequestMapping(value = "/position/page", method = RequestMethod.GET)
    @ResponseBody
    public Page queryPositionPage(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "order_column", required = false) String orderColumn,
            @RequestParam(value = "order_dir", required = false) String orderDir) {

        return positionAO.queryPositionPage(code, name, status, start, limit,
            orderColumn, orderDir);
    }

    @RequestMapping(value = "/position/list", method = RequestMethod.GET)
    @ResponseBody
    public List queryPositionList(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "status", required = false) String status) {
        return positionAO.queryPositionList(code, name, status);
    }

    @RequestMapping(value = "/worker/page", method = RequestMethod.GET)
    @ResponseBody
    public Page queryWorkerPage(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "order_column", required = false) String orderColumn,
            @RequestParam(value = "order_dir", required = false) String orderDir) {

        return workerAO.queryWorkerPage(code, name, status, start, limit,
            orderColumn, orderDir);
    }

    @RequestMapping(value = "/worker/list", method = RequestMethod.GET)
    @ResponseBody
    public List queryWorkerList(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam("companyCode") String companyCode) {
        return workerAO.queryWorkerList(code, name, status, companyCode);
    }

    @RequestMapping(value = "/news/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryNewsList(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "companyCode", required = false) String companyCode,
            @RequestParam(value = "creator", required = false) String creator,
            @RequestParam(value = "author", required = false) String author) {
        return newsAO.queryNewsList(code, keyword, type, status, companyCode,
            creator, author);
    }

    @RequestMapping(value = "/news/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryNewsPage(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "companyCode", required = false) String companyCode,
            @RequestParam(value = "creator", required = false) String creator,
            @RequestParam(value = "author", required = false) String author,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return newsAO.queryNewsPage(code, keyword, type, status, companyCode,
            creator, author, orderColumn, orderDir, start, limit);
    }

    @RequestMapping(value = "/addPartner", method = RequestMethod.POST)
    @ResponseBody
    public Object addPartner(
            @RequestParam("organization") String organization,
            @RequestParam("person") String person,
            @RequestParam("contact") String contact,
            @RequestParam("content1") String content1,
            @RequestParam("companyCode") String companyCode,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "organizationDesc", required = false) String organizationDesc) {
        return partnerAO.addPartner(organization, person, contact, content1,
            companyCode, type, organizationDesc);
    }

    @RequestMapping(value = "/addBuyCarPartner", method = RequestMethod.POST)
    @ResponseBody
    public Object addBuyCarPartner(@RequestParam("person") String person,
            @RequestParam("personDesc") String personDesc,
            @RequestParam("contact") String contact,
            @RequestParam("content1") String content1,
            @RequestParam("companyCode") String companyCode,
            @RequestParam("content2") String content2,
            @RequestParam("remark") String remark) {
        return partnerAO.addBuyCarPartner(person, personDesc, contact,
            content1, companyCode, content2, remark);
    }

    @RequestMapping(value = "/addOnlineMessage", method = RequestMethod.POST)
    @ResponseBody
    public Object addOnlineMessage(@RequestParam("person") String person,
            @RequestParam("content1") String content1,
            @RequestParam("companyCode") String companyCode) {
        return partnerAO.addOnlineMessage(person, content1, companyCode);
    }

    @RequestMapping(value = "/addResume", method = RequestMethod.POST)
    @ResponseBody
    public Object addResume(
            @RequestParam("content2") String content2,
            @RequestParam(value = "content1", required = false) String content1,
            @RequestParam("companyCode") String companyCode) {
        return partnerAO.addResume(content2, content1, companyCode);
    }

    @RequestMapping(value = "/ideas", method = RequestMethod.GET)
    @ResponseBody
    public Object doGetCompanyIdeas(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "companyCode", required = false) String companyCode) {
        return companyAO.doGetCompanyIdeas(code, companyCode);
    }

    @RequestMapping(value = "/menu/list", method = RequestMethod.GET)
    @ResponseBody
    public Object doGetMenuList(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "templetCode", required = false) String templetCode,
            @RequestParam(value = "parentCode", required = false) String parentCode,
            @RequestParam(value = "contentType", required = false) String contentType,
            @RequestParam(value = "contentSource", required = false) String contentSource,
            @RequestParam("companyCode") String companyCode) {
        return menuAO.doGetMenuList(code, status, templetCode, parentCode,
            contentType, contentSource, companyCode);
    }

    @RequestMapping(value = "/acontent/page", method = RequestMethod.GET)
    @ResponseBody
    public Object doGetAContentPage(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam("menuCode") String menuCode) {
        return contentAO.doGetAContentPage(code, type, title, orderColumn,
            orderDir, start, limit, menuCode);
    }

    @RequestMapping(value = "/acontent/list", method = RequestMethod.GET)
    @ResponseBody
    public Object doGetAContentList(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam("menuCode") String menuCode) {
        return contentAO.doGetAContentList(code, type, title, menuCode);
    }

}

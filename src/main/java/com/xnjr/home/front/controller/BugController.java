package com.xnjr.home.front.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.xnjr.home.front.ao.IBugAO;
import com.xnjr.home.front.res.Page;
import com.xnjr.home.front.res.XN704025Res;

@Controller
@RequestMapping(value = "/bug")
public class BugController {
    @Autowired
    IBugAO bugAO;

    @RequestMapping(value = "/report", method = RequestMethod.POST)
    public XN704025Res doReportBug(
            @RequestParam("module") String module,
            @RequestParam("topic") String topic,
            @RequestParam("content") String content,
            @RequestParam(value = "attachment", required = false) MultipartFile attachment,
            @RequestParam("alipay") String alipay,
            @RequestParam("period") String period)
            throws IllegalStateException, IOException {
        // String picture = null;
        // if (attachment != null) {
        // picture = attachment.getOriginalFilename();
        // String path =
        // "/Users/myb858/git/xn-home-front/src/main/webapp/resources/images/data/bug/"
        // + picture;
        // File localFile = new File(path);
        // // 写文件到本地
        // attachment.transferTo(localFile);
        // }
        return bugAO.doReportBug(module, topic, content, "", alipay, period);
    }

    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Page queryBugPage(
            @RequestParam(value = "alipay", required = false) String alipay,
            @RequestParam(value = "period", required = false) String period,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "date_start", required = false) String dateStart,
            @RequestParam(value = "date_end", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "order_column", required = false) String orderColumn,
            @RequestParam(value = "order_dir", required = false) String orderDir) {
        return bugAO.queryBugPage(alipay, period, status, dateStart, dateEnd,
            start, limit, orderColumn, orderDir);
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public List queryBugList(
            @RequestParam(value = "alipay", required = false) String alipay,
            @RequestParam(value = "period", required = false) String period,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "date_start", required = false) String dateStart,
            @RequestParam(value = "date_end", required = false) String dateEnd) {
        return bugAO.queryBugList(alipay, period, status, dateStart, dateEnd);
    }

}

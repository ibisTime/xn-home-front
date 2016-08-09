package com.xnjr.home.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.xnjr.home.front.session.ISessionProvider;
import com.xnjr.home.front.session.SessionUser;

/**
 * 跳转页面Controller
 * 
 * @author zhanggl10620
 * 
 */
@Controller
public class PageController {

    private static final String SESSION_KEY_USER = "user";

    @Autowired
    protected ISessionProvider sessionProvider;

    @RequestMapping(value = "/company/{view}.htm", method = RequestMethod.GET)
    public String userAction(@PathVariable("view") String view) {
        return "company/" + view;
    }

    @RequestMapping(value = "/{module}.htm", method = RequestMethod.GET)
    public String indexAction(@PathVariable("module") String module) {
        return module;
    }

    @RequestMapping(value = "/home/{module}.htm", method = RequestMethod.GET)
    public String homeAction(@PathVariable("module") String module) {
        return "home/" + module;
    }

    @RequestMapping(value = "/member/{page}.htm", method = RequestMethod.GET)
    public String memberAction(@PathVariable("page") String page) {
        return "member/" + page;
    }

    @RequestMapping(value = "/account/{page}.htm", method = RequestMethod.GET)
    public String accountAction(@PathVariable("page") String page) {
        return "account/" + page;
    }

    @RequestMapping(value = "/trade/{page}.htm", method = RequestMethod.GET)
    public String tradeAction(@PathVariable("page") String page) {
        return "trade/" + page;
    }

    @RequestMapping(value = "/account/{module}/{page}.htm", method = RequestMethod.GET)
    public String accountAction(@PathVariable("module") String module,
            @PathVariable("page") String page) {
        return "account/" + module + "/" + page;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String page() {
        SessionUser user = (SessionUser) sessionProvider
            .getAttribute(SESSION_KEY_USER);
        if (null != user) {
            return "redirect:user/signin.htm";
        }
        return "index";
    }
}

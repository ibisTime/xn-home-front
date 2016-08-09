package com.xnjr.home.front.ao;

import java.util.List;

import org.junit.Test;

import com.xnjr.home.front.ao.impl.BugAOImpl;
import com.xnjr.home.front.res.Page;
import com.xnjr.home.front.res.XN704025Res;

public class IBugAOTest {
    private static IBugAO ao = new BugAOImpl();

    @Test
    public final void doReportBug() {
        XN704025Res list = ao.doReportBug("1", "topic", "content",
            "attachment", "alipay", "1");
        System.out.println(list);
    }

    @Test
    public final void queryBugList() {
        List list = ao.queryBugList("", "", "", "", "");
        System.out.println(list);
    }

    @Test
    public final void queryCasePage() {
        Page page = ao.queryBugPage("", "", "", "", "", "0", "1", "", "");
        System.out.println(page);
    }
}

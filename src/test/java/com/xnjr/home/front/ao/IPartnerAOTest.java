package com.xnjr.home.front.ao;

import java.util.List;

import org.junit.Test;

import com.xnjr.home.front.ao.impl.PartnerAOImpl;
import com.xnjr.home.front.res.Page;

public class IPartnerAOTest {
    private static IPartnerAO ao = new PartnerAOImpl();

    @Test
    public final void queryPartnerList() {
        List list = ao.queryPartnerList("", "");
        System.out.println(list);
    }

    @Test
    public final void queryCasePage() {
        Page page = ao.queryPartnerPage("", "", "0", "1", "", "");
        System.out.println(page);
    }
}

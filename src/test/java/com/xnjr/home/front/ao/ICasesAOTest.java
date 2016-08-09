package com.xnjr.home.front.ao;

import java.util.List;

import org.junit.Test;

import com.xnjr.home.front.ao.impl.CasesAOImpl;
import com.xnjr.home.front.res.Page;

public class ICasesAOTest {
    private static ICasesAO ao = new CasesAOImpl();

    @Test
    public final void queryCaseList() {
        List list = ao.queryCaseList("", "", "", "", "");
        System.out.println(list);
    }

    @Test
    public final void queryCasePage() {
        Page page = ao.queryCasePage("", "", "", "", "0", "1", "", "", "");
        System.out.println(page);
    }
}

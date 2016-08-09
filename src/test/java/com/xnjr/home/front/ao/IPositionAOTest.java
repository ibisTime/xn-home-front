package com.xnjr.home.front.ao;

import java.util.List;

import org.junit.Test;

import com.xnjr.home.front.ao.impl.PositionAOImpl;
import com.xnjr.home.front.res.Page;

public class IPositionAOTest {
    private static IPositionAO ao = new PositionAOImpl();

    @Test
    public final void queryPositionList() {
        List list = ao.queryPositionList("", "", "");
        System.out.println(list);
    }

    @Test
    public final void queryPositionPage() {
        Page page = ao.queryPositionPage("", "", "", "0", "1", "", "");
        System.out.println(page);
    }
}

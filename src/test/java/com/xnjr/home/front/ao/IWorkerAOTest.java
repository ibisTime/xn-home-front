package com.xnjr.home.front.ao;

import java.util.List;

import org.junit.Test;

import com.xnjr.home.front.ao.impl.WorkerAOImpl;
import com.xnjr.home.front.res.Page;

public class IWorkerAOTest {
    private static IWorkerAO ao = new WorkerAOImpl();

    @Test
    public final void queryWorkerList() {
        List list = ao.queryWorkerList("", "", "", "");
        System.out.println(list);
    }

    @Test
    public final void queryWorkerPage() {
        Page page = ao.queryWorkerPage("", "", "", "0", "1", "", "");
        System.out.println(page);
    }
}

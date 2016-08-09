package com.xnjr.home.front.ao;

import java.util.List;

import org.junit.Test;

import com.xnjr.home.front.ao.impl.ProductAOImpl;
import com.xnjr.home.front.res.Page;

public class IProductAOTest {
    private static IProductAO ao = new ProductAOImpl();

    @Test
    public final void queryProductList() {
        List list = ao.queryProductList("", "", "", "", "");
        System.out.println(list);
    }

    @Test
    public final void queryProductPage() {
        Page page = ao.queryProductPage("", "", "", "", "0", "1", "", "");
        System.out.println(page);
    }
}

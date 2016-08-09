package com.xnjr.home.front.ao;

import java.util.List;

import com.xnjr.home.front.res.Page;

public interface IProductAO {

    List queryProductList(String code, String name, String kind, String status,
            String companyCode);

    Page queryProductPage(String code, String name, String kind, String status,
            String start, String limit, String orderColumn, String orderDir);

}

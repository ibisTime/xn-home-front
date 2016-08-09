package com.xnjr.home.front.ao;

import java.util.List;

import com.xnjr.home.front.res.Page;

public interface IWorkerAO {
    List queryWorkerList(String code, String name, String status,
            String companyCode);

    Page queryWorkerPage(String code, String name, String status, String start,
            String limit, String orderColumn, String orderDir);
}

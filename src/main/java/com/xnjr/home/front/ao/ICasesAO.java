package com.xnjr.home.front.ao;

import java.util.List;

import com.xnjr.home.front.res.Page;

public interface ICasesAO {

    Page queryCasePage(String code, String name, String dateStart,
            String dateEnd, String start, String limit, String orderColumn,
            String orderDir, String companyCode);

    List queryCaseList(String code, String name, String dateStart,
            String dateEnd, String companyCode);

}

package com.xnjr.home.front.ao;

import java.util.List;

import com.xnjr.home.front.res.Page;

public interface IPositionAO {

    Page queryPositionPage(String code, String name, String status,
            String start, String limit, String orderColumn, String orderDir);

    List queryPositionList(String code, String name, String status);

}

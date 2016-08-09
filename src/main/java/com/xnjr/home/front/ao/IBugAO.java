package com.xnjr.home.front.ao;

import java.util.List;

import com.xnjr.home.front.res.Page;
import com.xnjr.home.front.res.XN704025Res;

public interface IBugAO {

    XN704025Res doReportBug(String module, String topic, String content,
            String attachment, String alipay, String period);

    Page queryBugPage(String alipay, String period, String status,
            String dateStart, String dateEnd, String start, String limit,
            String orderColumn, String orderDir);

    List queryBugList(String alipay, String period, String status,
            String dateStart, String dateEnd);

}

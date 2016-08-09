package com.xnjr.home.front.ao;

import java.util.List;

import com.xnjr.home.front.res.Page;

public interface IPartnerAO {

    Page queryPartnerPage(String code, String name, String start, String limit,
            String orderColumn, String orderDir);

    List queryPartnerList(String code, String name);

    Object addPartner(String organization, String person, String contact,
            String content1, String companyCode, String type,
            String organizationDesc);

    Object addBuyCarPartner(String person, String personDesc, String contact,
            String content1, String companyCode, String content2, String remark);

    Object addOnlineMessage(String person, String content1, String companyCode);

    Object addResume(String content2, String content1, String companyCode);
}

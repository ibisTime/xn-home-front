package com.xnjr.home.front.ao;

import com.xnjr.home.front.res.XN704004Res;

public interface ICompanyAO {
    /**
     * 获取公司信息
     * @param code
     * @return 
     * @create: 2015年9月9日 下午4:48:58 myb858
     * @history:
     */
    XN704004Res doGetCompany(String code);

    Object doGetCompanyIdeas(String code, String companyCode);

}

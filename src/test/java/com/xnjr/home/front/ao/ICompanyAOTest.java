package com.xnjr.home.front.ao;

import org.junit.Test;

import com.xnjr.home.front.ao.impl.CompanyAOImpl;

public class ICompanyAOTest {
    private static ICompanyAO ao = new CompanyAOImpl();

    @Test
    public final void doGetCompany() {
        System.out.println(ao.doGetCompany("Com2015092520206087"));
    }

}

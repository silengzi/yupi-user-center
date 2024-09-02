package com.silengzi.usercenter.model.request;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserRegisterRequest implements Serializable {
    private static final long serialVersionUID = 789319750247503859L;

    /**
     * 用户账号
     */
    private String UserAccount;

    /**
     * 用户密码
     */
    private String UserPassword;

    /**
     * 校验密码
     */
    private String CheckPassword;

    /**
     * 星球编号
     */
    private String planetCode;
}

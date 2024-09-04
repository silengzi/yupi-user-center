package com.silengzi.usercenter.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.silengzi.usercenter.model.domain.User;

import javax.servlet.http.HttpServletRequest;

/**
 *
 */
public interface UserService extends IService<User> {
    /**
     * 用户注册
     *
     * @param userAccount       账号
     * @param userPassword      密码
     * @param checkPassword     校验密码
     * @param planetCode        星球编号
     * @return  新用户id
     */
    long UserRegister(String userAccount, String userPassword, String checkPassword, String planetCode);

    /**
     * 用户登录
     *
     * @param userAccount       账号
     * @param userPassword      密码
     * @param request
     * @return  脱敏后的用户信息
     */
    User UserLogin(String userAccount, String userPassword, HttpServletRequest request);
}

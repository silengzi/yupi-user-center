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
    long userRegister(String userAccount, String userPassword, String checkPassword, String planetCode);

    /**
     * 用户登录
     *
     * @param userAccount       账号
     * @param userPassword      密码
     * @param request
     * @return  脱敏后的用户信息
     */
    User userLogin(String userAccount, String userPassword, HttpServletRequest request);

    /**
     * 用户信息脱敏
     *
     * @param originUser
     * @return  脱敏后的用户信息
     */
    User getSafetyUser(User originUser);
}

package com.silengzi.usercenter.controller;

import com.silengzi.usercenter.model.domain.User;
import com.silengzi.usercenter.model.request.UserLoginRequest;
import com.silengzi.usercenter.model.request.UserRegisterRequest;
import com.silengzi.usercenter.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    @GetMapping("/test")
    public String test() {
        return "Hello world!";
    }

    @PostMapping("/register")
    public long register(@RequestBody UserRegisterRequest userRegisterRequest) {
        // 校验接口参数非空
        if(userRegisterRequest == null) {
            return -1;
        }

        String userAccount = userRegisterRequest.getUserAccount();
        String userPassword = userRegisterRequest.getUserPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        if(StringUtils.isAnyBlank(userAccount, userPassword, checkPassword)) {
            return -1;
        }

        long result = userService.userRegister(userAccount, userPassword, checkPassword, "100001");
        return result;
    }

    @PostMapping("/login")
    public User login(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request) {
        if(userLoginRequest == null) {
            return null;
        }

        String userAccount = userLoginRequest.getUserAccount();
        String userPassword = userLoginRequest.getUserPassword();
        if(StringUtils.isAnyBlank(userAccount, userPassword)) {
            return null;
        }

        User user = userService.userLogin(userAccount, userPassword, request);
        return user;
    }
}

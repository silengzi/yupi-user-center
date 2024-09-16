package com.silengzi.usercenter.controller;

import com.silengzi.usercenter.common.BaseResponse;
import com.silengzi.usercenter.common.ErrorCode;
import com.silengzi.usercenter.common.ResultUtils;
import com.silengzi.usercenter.model.domain.User;
import com.silengzi.usercenter.model.request.UserLoginRequest;
import com.silengzi.usercenter.model.request.UserRegisterRequest;
import com.silengzi.usercenter.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

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
    public BaseResponse<Long> register(@RequestBody UserRegisterRequest userRegisterRequest) {
        // 校验接口参数非空
        if(userRegisterRequest == null) {
            return ResultUtils.error(ErrorCode.NULL_ERROR, "参数不能为空");
        }

        String userAccount = userRegisterRequest.getUserAccount();
        String userPassword = userRegisterRequest.getUserPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        if(StringUtils.isAnyBlank(userAccount, userPassword, checkPassword)) {
            return ResultUtils.error(ErrorCode.PARAMS_ERROR, "参数不能为空");
        }

        long result = userService.userRegister(userAccount, userPassword, checkPassword, "100001");
        return ResultUtils.success(result);
    }

    @PostMapping("/login")
    public BaseResponse<User> login(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request) {
        if(userLoginRequest == null) {
            return ResultUtils.error(ErrorCode.PARAMS_ERROR);
        }

        String userAccount = userLoginRequest.getUserAccount();
        String userPassword = userLoginRequest.getUserPassword();
        if(StringUtils.isAnyBlank(userAccount, userPassword)) {
            return ResultUtils.error(ErrorCode.PARAMS_ERROR);
        }

        User user = userService.userLogin(userAccount, userPassword, request);
        return ResultUtils.success(user);
    }

    @PostMapping("/logout")
    public BaseResponse<Integer> userLoglout(HttpServletRequest request) {
        if(request == null) {
            return ResultUtils.error(ErrorCode.NULL_ERROR, "request 为空");
        }
        int result = userService.userLogout(request);
        return ResultUtils.success(result);
    }
    
    @GetMapping("/currentUser")
    public BaseResponse<User> currentUser(HttpServletRequest request) {
        Object obj = request.getSession().getAttribute("userLoginState");
        User user = (User) obj;
        if(user == null) {
            BaseResponse res = ResultUtils.error(ErrorCode.NO_LOGIN);
            return res;
        }
        long userId = user.getId();
        User currentUser = userService.getById(userId);
        User safetyUser = userService.getSafetyUser(currentUser);
        return ResultUtils.success(safetyUser);
    }

    @GetMapping("/search")
    public BaseResponse<List<User>> searchUserList(
            @RequestParam(value = "username", required = false, defaultValue = "") String username,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            HttpServletRequest request
    ) {
        if(username == null) {
            username = "";
        }
        List<User> userList = userService.userList(username, page, size, request);
        return ResultUtils.success(userList);
    }

    @GetMapping("/userDetail")
    public BaseResponse<User> userDetail(Long id, HttpServletRequest request) {
        if(id == null || id <= 0) {
            return null;
        }

        User user = userService.userDetail(id, request);
        return ResultUtils.success(user);
    }

    @PostMapping("delete")
    public BaseResponse<Boolean> deleteUser(@RequestBody long[] ids, HttpServletRequest request) {
        if(ids == null || ids.length == 0) {
            return ResultUtils.error(ErrorCode.NULL_ERROR);
        }

        for (long id: ids) {
            if(id <= 0) {
                return ResultUtils.error(ErrorCode.PARAMS_ERROR, "id 不能小于 0");
            }

            boolean result = userService.deleteUser(id, request);
            if(!result) {
                return ResultUtils.error(ErrorCode.SYSTEM_ERROR, "删除失败");
            }
        }

        return ResultUtils.success(true);
    }

    @PostMapping("update")
    public BaseResponse<User> updateUser(@RequestBody User newUser, HttpServletRequest request) {
        if(newUser == null) {
            return null;
        }

        User user = userService.updateUser(newUser, request);
        return ResultUtils.success(user);
    }
}

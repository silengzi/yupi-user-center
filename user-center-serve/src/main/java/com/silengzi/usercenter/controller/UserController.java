package com.silengzi.usercenter.controller;

import com.silengzi.usercenter.model.domain.User;
import com.silengzi.usercenter.model.request.UserIdRequest;
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

    @PostMapping("/logout")
    public int userLoglout(HttpServletRequest request) {
        if(request == null) {
            return -1;
        }
        int result = userService.userLogout(request);
        return result;
    }
    
    @GetMapping("/currentUser")
    public User currentUser(HttpServletRequest request) {
        Object obj = request.getSession().getAttribute("userLoginState");
        User user = (User) obj;
        if(user == null) {
            return null;
        }
        long userId = user.getId();
        User currentUser = userService.getById(userId);
        User safetyUser = userService.getSafetyUser(currentUser);
        return safetyUser;
    }

    @GetMapping("/search")
    public List<User> searchUserList(
            @RequestParam(value = "username", required = false, defaultValue = "") String username,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            HttpServletRequest request
    ) {
        if(username == null) {
            username = "";
        }
        List<User> userList = userService.userList(username, page, size, request);
        return userList;
    }

    @GetMapping("/userDetail")
    public User userDetail(Long id, HttpServletRequest request) {
        if(id == null || id <= 0) {
            return null;
        }

        return userService.userDetail(id, request);
    }

    @PostMapping("delete")
    public boolean deleteUser(@RequestBody long[] ids, HttpServletRequest request) {
        if(ids == null || ids.length == 0) {
            return false;
        }

        for (long id: ids) {
            if(id <= 0) {
                return false;
            }

            boolean result = userService.deleteUser(id, request);
            if(!result) {
                return false;
            }
        }

        return true;
    }

    @PostMapping("update")
    public User updateUser(@RequestBody User newUser, HttpServletRequest request) {
        if(newUser == null) {
            return null;
        }

        return userService.updateUser(newUser, request);
    }
}

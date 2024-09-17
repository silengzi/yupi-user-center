package com.silengzi.usercenter.controller;

import com.silengzi.usercenter.common.BaseResponse;
import com.silengzi.usercenter.common.ErrorCode;
import com.silengzi.usercenter.common.ResultUtils;
import com.silengzi.usercenter.exception.BusinessException;
import com.silengzi.usercenter.model.domain.User;
import com.silengzi.usercenter.model.request.UserLoginRequest;
import com.silengzi.usercenter.model.request.UserRegisterRequest;
import com.silengzi.usercenter.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static com.silengzi.usercenter.contant.UserConstant.ADMIN_ROLE;
import static com.silengzi.usercenter.contant.UserConstant.USER_LOGIN_STATE;

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
            throw new BusinessException(ErrorCode.NULL_ERROR);
        }

        String userAccount = userRegisterRequest.getUserAccount();
        String userPassword = userRegisterRequest.getUserPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        if(StringUtils.isAnyBlank(userAccount, userPassword, checkPassword)) {
            throw new BusinessException(ErrorCode.NULL_ERROR);
        }

        long result = userService.userRegister(userAccount, userPassword, checkPassword, "100001");
        return ResultUtils.success(result);
    }

    @PostMapping("/login")
    public BaseResponse<User> login(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request) {
        if(userLoginRequest == null) {
            throw new BusinessException(ErrorCode.NULL_ERROR);
        }

        String userAccount = userLoginRequest.getUserAccount();
        String userPassword = userLoginRequest.getUserPassword();
        if(StringUtils.isAnyBlank(userAccount, userPassword)) {
            throw new BusinessException(ErrorCode.NULL_ERROR);
        }

        User user = userService.userLogin(userAccount, userPassword, request);
        return ResultUtils.success(user);
    }

    @PostMapping("/logout")
    public BaseResponse<Integer> userLoglout(HttpServletRequest request) {
        if(request == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        int result = userService.userLogout(request);
        return ResultUtils.success(result);
    }
    
    @GetMapping("/currentUser")
    public BaseResponse<User> currentUser(HttpServletRequest request) {
        isAdmin(request);
        Object obj = request.getSession().getAttribute("userLoginState");
        User user = (User) obj;

        if(user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
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
        isAdmin(request);
        if(username == null) {
            username = "";
        }

        List<User> userList = userService.userList(username, page, size, request);

        return ResultUtils.success(userList);
    }

    @GetMapping("/userDetail")
    public BaseResponse<User> userDetail(Long id, HttpServletRequest request) {
        isAdmin(request);
        if(id == null || id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "id 不能为空且必须大于0");
        }

        User user = userService.userDetail(id, request);
        return ResultUtils.success(user);
    }

    @PostMapping("delete")
    public BaseResponse<Boolean> deleteUser(@RequestBody long[] ids, HttpServletRequest request) {
        isAdmin(request);
        if(ids == null || ids.length == 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "id 不能为空");
        }

        for (long id: ids) {
            if(id <= 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "id 必须大于0");
            }

            boolean result = userService.deleteUser(id, request);
            if(!result) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "删除失败");
            }
        }

        return ResultUtils.success(true);
    }

    @PostMapping("update")
    public BaseResponse<User> updateUser(@RequestBody User newUser, HttpServletRequest request) {
        isAdmin(request);
        if(newUser == null) {
            throw new BusinessException(ErrorCode.NULL_ERROR);
        }

        User user = userService.updateUser(newUser, request);
        return ResultUtils.success(user);
    }

    public void isAdmin(HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute(USER_LOGIN_STATE);
        if(user != null && user.getUserRole() == ADMIN_ROLE) {
            return;
        } else {
            throw new BusinessException(ErrorCode.NO_AUTH);
        }
    }
}

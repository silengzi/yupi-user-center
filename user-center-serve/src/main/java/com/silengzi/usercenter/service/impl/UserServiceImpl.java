package com.silengzi.usercenter.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.silengzi.usercenter.mapper.UserMapper;
import com.silengzi.usercenter.model.domain.User;
import com.silengzi.usercenter.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

/**
 *
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Override
    public long UserRegister(String userAccount, String userPassword, String checkPassword, String planetCode) {
        // 校验参数是否非空
        if (StringUtils.isAnyBlank(userAccount, userPassword, checkPassword, planetCode)) {
            return -1;
        }

        // 账户长度不小于4位
        if(userAccount.length() < 4)

        return 0;
    }
}





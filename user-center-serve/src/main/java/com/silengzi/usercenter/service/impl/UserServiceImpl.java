package com.silengzi.usercenter.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.silengzi.usercenter.mapper.UserMapper;
import com.silengzi.usercenter.model.domain.User;
import com.silengzi.usercenter.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Resource
    private UserMapper userMapper;

    @Override
    public long UserRegister(String userAccount, String userPassword, String checkPassword, String planetCode) {
        // 校验参数是否非空
        if (StringUtils.isAnyBlank(userAccount, userPassword, checkPassword, planetCode)) {
            return -1;
        }

        // 账户长度不小于4位
        if(userAccount.length() < 4) {
            return -1;
        }

        // 密码长度不小于八位
        if(userPassword.length() < 8) {
            return -1;
        }

        // 账户不能重复
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount", userAccount);
        long count = userMapper.selectCount(queryWrapper);
        if(count > 0) {
            return -1;
        }

        // 账户不能包含特殊字符
        String validPattern = "[`~!@#$%^&*()+=|{}':;',\\\\[\\\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";
        Matcher matcher = Pattern.compile(validPattern).matcher(userAccount);
        if (matcher.find()) {
            return -1;
        }

        // 密码和校验密码必须相同
        if(!userPassword.equals(checkPassword)) {
            return -1;
        }

        

        return 0;
    }
}





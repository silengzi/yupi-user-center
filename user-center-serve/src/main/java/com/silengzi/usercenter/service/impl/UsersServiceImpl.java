package com.silengzi.usercenter.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.silengzi.usercenter.model.domain.Users;
import com.silengzi.usercenter.service.UsersService;
import com.silengzi.usercenter.mapper.UsersMapper;
import org.springframework.stereotype.Service;

/**
 *
 */
@Service
public class UsersServiceImpl extends ServiceImpl<UsersMapper, Users>
    implements UsersService{

}





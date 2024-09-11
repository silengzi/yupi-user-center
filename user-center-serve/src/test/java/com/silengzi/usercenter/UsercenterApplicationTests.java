package com.silengzi.usercenter;

import com.silengzi.usercenter.mapper.UsersMapper;
import com.silengzi.usercenter.model.domain.User;
import com.silengzi.usercenter.model.domain.Users;
import com.silengzi.usercenter.service.UserService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@SpringBootTest
class UsercenterApplicationTests {

    @Resource
    private UsersMapper usersMapper;

    @Resource
    private UserService userService;

    @Test
    void contextLoads() {
    }

    @Test
    void testUser() {
        System.out.println("-----------------test-------------------");
        List<Users> userList = usersMapper.selectList(null);
        Assert.assertEquals(5, userList.size());
        userList.forEach(System.out::println);
    }

    @Test
    void testRegister() {
        long userId = userService.userRegister("silengzi", "12345678", "12345678", "1001");
        Assert.assertEquals(1, userId);
    }


}

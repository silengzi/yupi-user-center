package com.silengzi.usercenter;

import com.silengzi.usercenter.mapper.UsersMapper;
import com.silengzi.usercenter.model.domain.Users;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.List;

@SpringBootTest
class UsercenterApplicationTests {

    @Resource
    private UsersMapper usersMapper;

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

}

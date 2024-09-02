package com.silengzi.usercenter;

import com.silengzi.usercenter.mapper.UsersMapper;
import com.silengzi.usercenter.model.domain.Users;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import javax.annotation.Resource;
import java.util.List;

@SpringBootTest
public class SampleTest {

    @Resource
    private UsersMapper usersMapper;

    @Test
    public void testSelect() {
        System.out.println(("----- selectAll method test ------"));
        List<Users> userList = usersMapper.selectList(null);
//        Assert.isTrue(5 == userList.size(), "");
        Assert.assertEquals(2, userList.size());
        userList.forEach(System.out::println);
    }


}
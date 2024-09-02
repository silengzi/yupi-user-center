package com.silengzi.usercenter.controller;

import com.silengzi.usercenter.model.domain.User;
import com.silengzi.usercenter.model.request.UserRegisterRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/test")
    public String test() {
        return "Hello world!";
    }

//    @PostMapping("/register")
//    public List<User> register(@RequestBody UserRegisterRequest userRegisterRequest) {
//
//    }
}

package com.silengzi.usercenter.model.request;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserIdRequest implements Serializable {
    private static final long serialVersionUID = 789319750247503859L;

    /**
     * 用户 id
     */
    private long id;
}

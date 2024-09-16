package com.silengzi.usercenter.common;

public class ResultUtils {
    /**
     * 请求成功
     * @param data
     * @param <T>
     * @return
     */
    public static <T> BaseResponse<T> success(T data) {
        return new BaseResponse<>(20000, data, "成功");
    }

    public static BaseResponse error(ErrorCode errorCode) {
        return new BaseResponse<>(errorCode);
    }

    public static BaseResponse error(ErrorCode errorCode, String description) {
        return new BaseResponse<>(errorCode.getCode(), null, errorCode.getMessage(), description);
    }

    public static BaseResponse error(int code, String message, String description) {
        return new BaseResponse(code, null, message, description);
    }

    public static BaseResponse error(int code, String message) {
        return new BaseResponse(code, null, message, "");
    }

    public static BaseResponse error(int code) {
        return new BaseResponse(code, null, "", "");
    }
}

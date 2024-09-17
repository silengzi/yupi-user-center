package com.silengzi.usercenter.exception;

import com.silengzi.usercenter.common.BaseResponse;
import com.silengzi.usercenter.common.ErrorCode;
import com.silengzi.usercenter.common.ResultUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    /**
     * 业务异常
     * @param e
     * @return
     */
    @ExceptionHandler(BusinessException.class)
    public BaseResponse<?> businessException(BusinessException e) {
        log.error("BusinessException: " + e.getMessage(), e);
        return ResultUtils.error(e.getCode(), e.getMessage(), e.getDescription());
    }

    /**
     * 系统异常
     */
    @ExceptionHandler(RuntimeException.class)
    public BaseResponse<?> runtimeException(RuntimeException e) {
        log.error("RuntimeException: " + e);
        return ResultUtils.error(ErrorCode.SYSTEM_ERROR, "");
    }

    // 捕获 HttpMessageNotReadableException 异常
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {
        return new ResponseEntity<>("请求体不能为空或格式错误", HttpStatus.BAD_REQUEST);
    }
}

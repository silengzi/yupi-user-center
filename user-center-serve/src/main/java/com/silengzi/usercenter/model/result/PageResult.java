package com.silengzi.usercenter.model.result;

import java.util.List;

public class PageResult<T> {
    private List<T> records;  // 用户列表
    private long total;       // 总数

    public PageResult(List<T> records, long total) {
        this.records = records;
        this.total = total;
    }

    // Getters and Setters
    public List<T> getRecords() {
        return records;
    }

    public void setRecords(List<T> records) {
        this.records = records;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }
}

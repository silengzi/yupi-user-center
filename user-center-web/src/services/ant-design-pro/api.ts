// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 定义相应拦截器
const responseInterceptors = [
  // 直接写一个 function，作为拦截器
  (response: any) => {
    // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
    const { data = {} as any, config } = response;
    console.log("data, config", data, config)
    // do something
    return data
  },
]

/** 获取当前的用户 GET /api/user/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  // return request<{ data: API.CurrentUser; }>('/api/user/currentUser', {
  
  return request<API.CurrentUser>('/api/user/currentUser', {
    method: 'GET',
    ...(options || {}),
    responseInterceptors
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  // return request<Record<string, any>>('/api/user/logout', {
  return request<number>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
    responseInterceptors
  });
}

/** 登录接口 POST /api/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
    responseInterceptors
  });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  // return request<API.RegisterResult>('/api/user/register', {
  return request<number>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
    responseInterceptors
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
    responseInterceptors
  });
}

/** 获取用户列表 GET /api/user/search */
export async function userSearch(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const res = request<API.UserList>('/api/user/search', {
    method: 'GET',
    params: {
      ...params,
      page: params.current,
      size: params.pageSize,
    },
    ...(options || {}),
    responseInterceptors
  });

  const p = new Promise<API.UserList>(async (resolve, reject) => {
    const data: any = await res
    resolve({
      data: data.records,
      success: true,
      total: data.total
    })
  })
  return p
}

/** 获取当前的用户 GET /api/user/userDetail */
export async function userDetail(params: {id: number}, options?: { [key: string]: any }) {
  // return request<{ data: API.userDetail; }>('/api/user/userDetail', {
  return request<API.CurrentUser>('/api/user/userDetail', {
    method: 'GET',
    params,
    ...(options || {}),
    responseInterceptors
  });
}

/** 更新用户信息 PUT /api/user/update */
export async function updateUser(options?: API.CurrentUser) {
  return request<API.CurrentUser>('/api/user/update', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
    responseInterceptors
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
    responseInterceptors
  });
}

/** 删除用户 DELETE /api/user/delete */
// export async function deleteUser(options?: { [key: string]: any }) {
  // return request<Record<string, any>>('/api/user/delete', {
export async function deleteUser(ids?: { [key: string]: any }) {
  return request<number[]>('/api/user/delete', {
    method: 'POST',
    data: ids,
    responseInterceptors
    // data: {
    //   method: 'post',
    //   ...(options || {}),
    // },
  });
}

// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/user/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  // return request<{ data: API.CurrentUser; }>('/api/user/currentUser', {
  return request<API.CurrentUser>('/api/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  // return request<Record<string, any>>('/api/user/logout', {
  return request<number>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
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
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
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
  });

  const p = new Promise<API.UserList>(async (resolve, reject) => {
    resolve({
      data: await res as any,
      success: true,
      total: 14
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
  });
}

/** 删除用户 DELETE /api/user/delete */
// export async function deleteUser(options?: { [key: string]: any }) {
  // return request<Record<string, any>>('/api/user/delete', {
export async function deleteUser(ids?: { [key: string]: any }) {
  return request<number[]>('/api/user/delete', {
    method: 'POST',
    data: ids
    // data: {
    //   method: 'post',
    //   ...(options || {}),
    // },
  });
}

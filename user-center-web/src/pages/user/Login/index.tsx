import Footer from '@/components/Footer';
import { login, register } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import type { FormInstance } from 'antd';  // 导入 FormInstance 类型
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Alert, message, Tabs } from 'antd';
import React, { useRef, useState } from 'react';
import { history, useModel } from 'umi';
import styles from './index.less';
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const formRef = useRef<FormInstance | null>(null); // 使用 useRef 创建一个 form 引用
  const handleReset = () => {
    formRef.current?.resetFields(); // 使用 formRef 调用 resetFields 方法重置表单
  };
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  // 调用登录接口
  const handleLogin = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({
        ...values
      });
      if (msg.status === 'ok') {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo(); // 获取用户信息
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        history.push(redirect || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  }
  
  // 调用注册接口
  const handleRegister = async (values: API.RegisterParams) => {
    try {
      // 注册
      const result = await register({
        ...values
      });
      // if (result.status === 'ok') {
      if (result > 0) {
        const defaultLoginSuccessMessage = '注册成功！请登录！';
        message.success(defaultLoginSuccessMessage);
        handleReset()
        setType('account')
        // await fetchUserInfo();
        // /** 此方法会跳转到 redirect 参数所在的位置 */
        // if (!history) return;
        // const { query } = history.location;
        // const { redirect } = query as {
        //   redirect: string;
        // };
        // history.push(redirect || '/');
        return;
      }
      // console.log(result);
      // 如果失败去设置用户错误信息
      // setUserLoginState(result);
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  }

  const handleSubmit = (values: API.LoginParams | API.RegisterParams) => {
    if(type === 'account') {
      handleLogin(values as API.LoginParams)
    } else {
      handleRegister(values as API.RegisterParams)
    }
  };

  const { status, type: loginType } = userLoginState;
  const submitText = {
    account: '登录',
    register: '注册',
  };

  const backgroundVideoUrl = 'https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr'

  return (
    <div
      className={styles.container}
    >
      <div
        className={styles.content}
        style={{
          position: 'absolute',
          zIndex: 11,
          width: '100%',
          top: '40%',
          transform: 'translate(0, -50%)'
        }}
      >
        <LoginForm
          formRef={formRef}  // 将 formRef 传递给 LoginForm 的 formRef 属性
          logo={<img alt="logo" src="/logo.svg" />}
          // backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
          // backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
          title="用户管理中心"
          subTitle={'Ant Design 是西湖区最具影响力的 Web 设计规范'}
          initialValues={{
            autoLogin: true,
          }}
          submitter={{ searchConfig: { submitText: submitText[type as keyof typeof submitText] } }}
          // actions={<a>跳转支付宝登录</a>}

          /* actions={[
            '其他登录方式 :',
            <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
            <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
            <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
          ]} */

          onFinish={async (values: API.LoginParams | API.RegisterParams) => {
            await handleSubmit(values);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账户密码登录'} />
            <Tabs.TabPane key="register" tab={'新用户注册'} />
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                  autoComplete: 'new-password',  // 禁用自动填充
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {status === 'error' && loginType === 'register' && 
            <LoginMessage content={'错误的用户名和密码'} />
          }
          {type === 'register' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                  autoComplete: 'new-password',  // 禁用自动填充
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请再次校验密码'}
                rules={[
                  {
                    required: true,
                    message: '校验密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
              display: type === 'account' ? 'block' : 'none',

            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码 ?
            </a>
          </div>
        </LoginForm>
      </div>

      <Footer />

      {/* 背景视频及蒙版 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        {/* 浅色蒙版 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.3)', /* 浅色（白色）半透明蒙版 */
            zIndex: 2, /* 位于视频上方，内容下方 */
            display: 'none'
          }}
        ></div>

        <video
          src={backgroundVideoUrl}
          controls={false}
          autoPlay
          playsInline
          loop
          muted={true}
          crossOrigin="anonymous"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};
export default Login;

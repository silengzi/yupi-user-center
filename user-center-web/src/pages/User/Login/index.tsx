import { Footer } from '@/components';
import { login, register } from '@/services/ant-design-pro/api';
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
import { Helmet, history, useModel } from '@umijs/max';
import { Alert, message, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import React, { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import styles_less from './index.less';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
const ActionIcons = () => {
  const { styles } = useStyles();
  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.action} />
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.action} />
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.action} />
    </>
  );
};
const Lang = () => {
  const { styles } = useStyles();
  return;
};
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();

  const formRef = useRef<FormInstance | null>(null); // 使用 useRef 创建一个 form 引用
  const handleReset = () => {
    formRef.current?.resetFields(); // 使用 formRef 调用 resetFields 方法重置表单
  };

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  // 调用登录接口
  const handleLogin = async (values: API.LoginParams) => {
    try {
      // 登录
      const result = await login({
        ...values,
        type,
      });
      // if (result.status === 'ok') {
      if (result) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log(result);
      // 如果失败去设置用户错误信息
      setUserLoginState(result);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
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
      } else {
        message.error(result.description);
      }
      // console.log(result);
      // 如果失败去设置用户错误信息
      // setUserLoginState(result);
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  }

  const handleSubmit = async (values: API.LoginParams | API.RegisterParams) => {
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

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        className={styles_less.content}
        style={{
          flex: '1',
          padding: '32px 0',
          position: 'absolute',
          zIndex: 11,
          width: '100%',
          top: '40%',
          transform: 'translate(0, -50%)'
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="用户管理中心"
          subTitle={' '}
          // subTitle={'一个经典美观的后台管理系统'}
          initialValues={{
            autoLogin: true,
          }}
          submitter={{ searchConfig: { submitText: submitText[type as keyof typeof submitText] } }}
          // actions={['其他登录方式 :', <ActionIcons key="icons" />]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
              {
                key: 'register',
                label: '新用户注册',
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
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
                  prefix: <LockOutlined />,
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

          {status === 'error' && loginType === 'register' && <LoginMessage content="错误的用户名和密码" />}
          {type === 'register' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
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
                  prefix: <LockOutlined />,
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
                  prefix: <LockOutlined />,
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
          src="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
          // src="/video_WebTitle_batch.mp4"
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

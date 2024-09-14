import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProForm
} from '@ant-design/pro-components';
import '@umijs/max';
import { Col, Row, Space, message, Modal, Button } from 'antd';
import React, { useRef, useState } from 'react';
import { userDetail } from '@/services/ant-design-pro/api';
import type { ProFormInstance } from '@ant-design/pro-components';

type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'vertical';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;
export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: API.CurrentUser) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.CurrentUser>;
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formLayoutType, setFormLayoutType] = useState<LayoutType>(
    LAYOUT_TYPE_HORIZONTAL,
  );

  const formItemLayout =
    formLayoutType === LAYOUT_TYPE_HORIZONTAL
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;
  const formRef = useRef<ProFormInstance>();
      
  return (
    <Modal
      width={640}
      styles={{
        body: {
          padding: '32px 40px 48px',
        },
      }}
      destroyOnClose
      title={'用户修改'}
      open={props.updateModalOpen}
      footer={[
        <Button key="back" onClick={() => {
          props.onCancel();
        }}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={async () => {
          const values: API.CurrentUser = {
            ...props.values,
            ...(await formRef?.current?.validateFields())
          };
          props.onSubmit(values);
        }}>
          确定
        </Button>,
        <Button
          key="link"
          type="primary"
          onClick={() => {
            formRef?.current?.resetFields()
          }}
        >
          重置
        </Button>
      ]}
      // onOk={async () => {
      //   const values: API.CurrentUser = {
      //     ...props.values,
      //     ...(await formRef?.current?.validateFields())
      //   };
      //   props.onSubmit(values);
      // }}
      // onCancel={() => {
      //   props.onCancel();
      // }}
    >
      <ProForm<API.CurrentUser>
        formRef={formRef}
        {...formItemLayout}
        layout={formLayoutType}
        submitter={{
          render: (props, doms) => {
            return <></>
            // return formLayoutType === LAYOUT_TYPE_HORIZONTAL ? (
            //   <Row>
            //     <Col span={14} offset={4}>
            //       <Space>{doms}</Space>
            //     </Col>
            //   </Row>
            // ) : (
            //   doms
            // );
          },
        }}
        // onFinish={async (values) => {
        //   // await waitTime(2000);
        //   console.log(values);
        //   message.success('提交成功');
        // }}
        params={{}}
        request={async () => { // 获取用户信息接口数据，用于初始化回显
          const userId = props.values.id
          const res = await userDetail({ id: userId as number });
          return res;
        }}
      >
        {/* <ProFormRadio.Group
          style={{
            margin: 16,
          }}
          label="标签布局"
          radioType="button"
          fieldProps={{
            value: formLayoutType,
            onChange: (e) => setFormLayoutType(e.target.value),
          }}
          options={['horizontal', 'vertical', 'inline']}
        /> */}
        <ProFormText
          width="md"
          name="username"
          label="用户名称"
          placeholder="请输入用户名称"
        />
        <ProFormText
          width="md"
          name="avatarUrl"
          label="头像"
          placeholder="请输入头像地址"
        />
        <ProFormRadio.Group
          name="invoiceType"
          label="gender"
          initialValue={0}
          options={[
            {label: '女', value: 0},
            {label: '男', value: 1},
          ]}
        />
        <ProFormText
          width="md"
          name="phone"
          label="电话"
          placeholder="请输入电话地址"
        />
        <ProFormText
          width="md"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱地址"
        />
        <ProFormSelect
          width="md"
          name="userStatus"
          label="状态"
          options={[
            {
              value: 0,
              label: "正常",
            },
            {
              value: 1,
              label: "封禁",
            },
          ]}
        />
      </ProForm>
    </Modal>
  );
};
{/* <StepsForm
  stepsProps={{
    size: 'small',
  }}
  stepsFormRender={(dom, submitter) => {
    return (
      <Modal
        width={640}
        styles={{
          body: {
            padding: '32px 40px 48px',
          },
        }}
        destroyOnClose
        title={'用户修改'}
        open={props.updateModalOpen}
        footer={submitter}
        onCancel={() => {
          props.onCancel();
        }}
      >
        {dom}
      </Modal>
    );
  }}
  onFinish={props.onSubmit}
>
  <StepsForm.StepForm
    initialValues={{
      name: props.values.name,
      desc: props.values.desc,
    }}
    title={'基本信息'}
  >
    <ProFormText
      name="name"
      label={'规则名称'}
      width="md"
      rules={[
        {
          required: true,
          message: '请输入规则名称！',
        },
      ]}
    />
    <ProFormTextArea
      name="desc"
      width="md"
      label={'规则描述'}
      placeholder={'请输入至少五个字符'}
      rules={[
        {
          required: true,
          message: '请输入至少五个字符的规则描述！',
          min: 5,
        },
      ]}
    />
  </StepsForm.StepForm>
  <StepsForm.StepForm
    initialValues={{
      target: '0',
      template: '0',
    }}
    title={'配置规则属性'}
  >
    <ProFormSelect
      name="target"
      width="md"
      label={'监控对象'}
      valueEnum={{
        0: '表一',
        1: '表二',
      }}
    />
    <ProFormSelect
      name="template"
      width="md"
      label={'规则模板'}
      valueEnum={{
        0: '规则模板一',
        1: '规则模板二',
      }}
    />
    <ProFormRadio.Group
      name="type"
      label={'规则类型'}
      options={[
        {
          value: '0',
          label: '强',
        },
        {
          value: '1',
          label: '弱',
        },
      ]}
    />
  </StepsForm.StepForm>
  <StepsForm.StepForm
    initialValues={{
      type: '1',
      frequency: 'month',
    }}
    title={'设定调度周期'}
  >
    <ProFormDateTimePicker
      name="time"
      width="md"
      label={'开始时间'}
      rules={[
        {
          required: true,
          message: '请选择开始时间！',
        },
      ]}
    />
    <ProFormSelect
      name="frequency"
      label={'监控对象'}
      width="md"
      valueEnum={{
        month: '月',
        week: '周',
      }}
    />
  </StepsForm.StepForm>
</StepsForm> */}
export default UpdateForm;

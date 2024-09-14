import { addRule, deleteUser, userSearch, updateUser } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import type { PopconfirmProps } from 'antd';
import { Button, Drawer, Input, Image, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.CurrentUser) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({
      ...fields,
    });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * 更新用户信息
 *
 * @param user
 */
const handleUpdate = async (user: API.CurrentUser) => {
  const hide = message.loading('正在修改');
  try {
    await updateUser(user);
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败，请重试！');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.CurrentUser[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    // await deleteUser({ key: selectedRows.map((row) => row.id) });
    await deleteUser(selectedRows.map(row => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.CurrentUser>();
  const [selectedRowsState, setSelectedRows] = useState<API.CurrentUser[]>([]);

  const confirm = async (e: any, record: any) => {
    // handleDeleteUser(true);
    await handleRemove(record);
    if(record.length == 1) {
      // 删除单个
      setCurrentRow(record);
      actionRef.current?.reload();
    } else {
      // 批量删除
      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();
    }

    // console.log(e);
    // message.success('删除成功');
  };
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    // console.log(e);
    message.error('点击了取消');
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.CurrentUser>[] = [
    {
      title: '用户名称',
      dataIndex: 'username',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '账号', // label
      dataIndex: 'userAccount', // 字段名
      valueType: 'textarea',
      search: false // 是否隐藏搜索框
    },
    {
      title: '头像', // label
      dataIndex: 'avatarUrl', // 字段名
      valueType: 'textarea',
      search: false, // 是否隐藏搜索框
      render: (dom, entity) => {
        return (
          // <div>
            // <img src={entity.avatarUrl} style={{width: '50px', height: '50px'}} alt='头像加载失败'/>
          // </div>
          <Image
            width={50}
            src={entity.avatarUrl || 
                  (entity.gender === 1 ? 
                    'https://gd-hbimg.huaban.com/7cf435f0e7ccbf5899d1270b0c718002654092a2580c-xxeliI_fw658webp' : 
                    'https://gd-hbimg.huaban.com/7a42d34776fffc359f221e1ba67c3faa0266b02bd9be-dACpqJ_fw658webp')}
          />
        );
      },
    },
    {
      title: '手机号', // label
      dataIndex: 'phone', // 字段名
      valueType: 'textarea',
      search: false // 是否隐藏搜索框
    },
    {
      title: '邮箱', // label
      dataIndex: 'email', // 字段名
      valueType: 'textarea',
      search: false // 是否隐藏搜索框
    },
    /* {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) => `${val}${'万'}`,
    }, */
    {
      title: '性别',
      dataIndex: 'gender',
      hideInForm: true,
      search: false, // 是否隐藏搜索框
      valueEnum: {
        0: {
          text: '女',
        },
        1: {
          text: '男',
        },
      },
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      hideInForm: true,
      search: false, // 是否隐藏搜索框
      valueEnum: {
        0: {
          text: '普通用户',
        },
        1: {
          text: '管理员',
        },
      },
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
      hideInForm: true,
      search: false, // 是否隐藏搜索框
      valueEnum: {
        0: {
          text: '正常',
        },
      },
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false, // 是否隐藏搜索框
      /* renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder={'请输入异常原因！'} />;
        }
        return defaultRender(item);
      }, */
    },
    // {
    //   title: '修改时间',
    //   sorter: true,
    //   dataIndex: 'updateTime',
    //   valueType: 'dateTime',
    //   search: false // 是否隐藏搜索框
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        <Popconfirm
          title="删除用户"
          description="你确定要删除该用户吗？"
          onConfirm={(e) => {
            confirm!(e, [record])
          }}
          onCancel={cancel}
          okText="确定"
          cancelText="取消"
        >
          <a
            key="subscribeAlert"
          >
            删除
          </a>
        </Popconfirm>
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.CurrentUser, API.PageParams>
        style={{
          marginBottom: '100px'
        }}
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        /* toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]} */
        request={userSearch}
        pagination={{
          pageSize: 10, // 一页 10 条
          onChange: (page) => console.log(page),
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              {/* <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span> */}
            </div>
          }
        >
          <Popconfirm
            title="批量删除用户"
            description="你确定要批量删除这些用户吗？"
            onConfirm={(e) => {
              confirm!(e, selectedRowsState)
            }}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="primary"
              // onClick={async () => {
              //   await handleRemove(selectedRowsState);
              //   setSelectedRows([]);
              //   actionRef.current?.reloadAndRest?.();
              // }}
            >
              批量删除
            </Button>
          </Popconfirm>
          {/* <Button type="primary">批量审批</Button> */}
        </FooterToolbar>
      )}
      {/* <ModalForm
        title={'新建规则'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.CurrentUser);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm> */}
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.username && (
          <ProDescriptions<API.CurrentUser>
            column={2}
            title={currentRow?.username}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.username,
            }}
            columns={columns as ProDescriptionsItemProps<API.CurrentUser>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default TableList;

import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import styles from './index.less';

const Footer: React.FC = () => {
  const defaultMessage = '四棱子出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      className={styles.defaultFooter}
      copyright={`${currentYear} ${defaultMessage}`}
      style={{
        background: 'none',
      }}
      links={[
        // {
        //   key: 'Ant Design Pro',
        //   title: 'Ant Design Pro',
        //   href: 'https://pro.ant.design',
        //   blankTarget: true,
        // },
        // {
        //   key: 'github',
        //   title: <GithubOutlined />,
        //   href: 'https://github.com/silengzi',
        //   blankTarget: true,
        // },
        // {
        //   key: 'Ant Design',
        //   title: 'Ant Design',
        //   href: 'https://ant.design',
        //   blankTarget: true,
        // },
      ]}
    />
  );
};

export default Footer;

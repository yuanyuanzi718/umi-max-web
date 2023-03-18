import { useModel } from '@umijs/max';
import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Home from '../Home';
import News from '../News';
import Product from '../Product';
import styles from './index.less'

const items: MenuProps['items'] = [
  {
    label: '首页',
    key: 'home',
    icon: <MailOutlined />,
  },
  {
    label: '新闻中心',
    key: 'news',
    icon: <AppstoreOutlined />,
  },
  {
    label: '产品与服务',
    key: 'product',
    icon: <MailOutlined />,
  },
  {
    label: '后台系统',
    key: 'admin',
    icon: <MailOutlined />,
  },
];
const HomePage: React.FC = (props) => {
  console.log(props, 'props');

  const [current, setCurrent] = useState('news');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    if (e.key === 'admin') {
      window.location.href = "http://localhost:7002"
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <Menu
          style={{ minWidth: 0, flex: "auto" }}
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <div className={styles.guanwang}>企业门户官网</div>
      </div>
      {current === 'home' && <Home />}
      {current === 'news' && <News />}
      {current === 'product' && <Product />}
    </div>
  )
};

export default HomePage;

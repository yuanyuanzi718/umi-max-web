import { Outlet, history, useLocation } from '@umijs/max';
import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
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
];

const HomePage: React.FC = (props) => {
  const location = useLocation();
  const [current, setCurrent] = useState('home');
  useEffect(() => {
    if (location.pathname.includes('home')) {
      setCurrent('home')
    } else if (location.pathname.includes('news')) {
      setCurrent('news')
    } else if (location.pathname.includes('product')) {
      setCurrent('product')
    }
  }, [])

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    if (e.key === 'home') {
      history.push('/home')
    } else if (e.key === 'news') {
      history.push('/news')
    } else if (e.key === 'product') {
      history.push('/product')
    }
  }

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
        <div className={styles.guanwang} onClick={() => { window.location.href = "http://localhost:7002" }}>跳转后台系统</div>
      </div>
      <Outlet />
    </div>
  )
};

export default HomePage;

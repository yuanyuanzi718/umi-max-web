import React, { useState, useEffect } from 'react';
import { request } from '@umijs/max';
import { Row, Col, AutoComplete, Input, Card, Tabs } from 'antd';
import type { TabsProps } from 'antd'
import type { SelectProps } from 'antd/es/select';
import styles from './index.less'
import dayjs from 'dayjs';
const { Meta } = Card;

const News: React.FC = () => {
  const [newsList, setnewsList] = useState<any>([]);
  const [newsShow, setnewsShow] = useState<any>([]);
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);



  useEffect(() => {
    request('/webapi/news/list', {}).then(res => {
      console.log(res);
      if (res.success) {
        setnewsList(res.data.list)
        setnewsShow(res.data.list.slice(0, 4))
      }
    })
  }, [])

  const searchResult = (value: string) => {
    const tem = newsList.filter((item: any) => item.title.includes(value))
    if (tem && tem.length > 0) {
      return tem.map((item: any) => {
        return {
          value: item.title,
          label: (
            <div
              style={{
                display: 'flex',
              }}
            >
              {item.title}
            </div>
          ),
        }
      })
    }
  }
  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const goDetail = (id: string) => {
    console.log('id', id);
  }

  const onSelect = (value: string) => {
    console.log('value', value);
    const tem = newsList.filter((item: any) => item.title.includes(value))
    goDetail(tem._id)
  };

  const tabOnChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `最新动态`,
      children: `Content of Tab Pane 1`,
    },
    {
      key: '2',
      label: `典型案例`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: '3',
      label: `通知公告`,
      children: `Content of Tab Pane 3`,
    },
  ];


  return (
    <div className={styles.newsBox}>
      <div className={styles.herder}>
        <AutoComplete
          dropdownMatchSelectWidth={252}
          className={styles.search}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
        >
          <Input.Search
            size="large"
            placeholder="请输入新闻关键字"
            allowClear
          />
        </AutoComplete>
      </div>
      <Row className={styles.newsList} gutter={16}>
        {
          newsShow.map((item: any, index: number) => {
            return <Col span={6} key={item._id}>
              <Card
                onClick={() => { goDetail(item._id) }}
                className={styles.newsCard}
                hoverable
                cover={<div
                  style={{ backgroundImage: `url(${item?.cover ? item.cover.thumbUrl : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"})` }}
                  className={styles.newsImg}
                ></div>}
              >
                <Meta title={item.title} description={dayjs(item.editTime).format('YYYY-MM-DD HH:mm:ss')} />
              </Card>
            </Col>
          })
        }
      </Row>
      <Row className={styles.newsTabBox}>
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={tabOnChange}
        />
      </Row>
    </div>
  );
};

export default News;
import React, { useState, useEffect } from 'react';
import { request, history } from '@umijs/max';
import { Row, Col, AutoComplete, Input, Card, Tabs, Avatar, Image } from 'antd';
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
    history.push(`/news/${id}`)
  }

  const onSelect = (value: string) => {
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
      children: <div>
        {
          newsList.map((item: any) => {
            if (item.category === 1) {
              return <Card
                key={item._id}
                onClick={() => { goDetail(item._id) }}
                hoverable
                style={{ width: '100%', marginBottom: 15 }}
              >
                <Meta
                  avatar={
                    <Image
                      width={200}
                      src={item?.cover ? item.cover.thumbUrl : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
                    />
                  }
                  title={item.title}
                  description={dayjs(item.editTime).format('YYYY-MM-DD HH:mm:ss')}
                />
              </Card>
            }
          })
        }
      </div>
    },
    {
      key: '2',
      label: `典型案例`,
      children: <div>
        {
          newsList.map((item: any) => {
            if (item.category === 2) {
              return <Card
                key={item._id}
                onClick={() => { goDetail(item._id) }}
                hoverable
                style={{ width: '100%', marginBottom: 15 }}
              >
                <Meta
                  avatar={
                    <Image
                      width={200}
                      src={item?.cover ? item.cover.thumbUrl : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
                    />
                  }
                  title={item.title}
                  description={dayjs(item.editTime).format('YYYY-MM-DD HH:mm:ss')}
                />
              </Card>
            }
          })
        }
      </div>,
    },
    {
      key: '3',
      label: `通知公告`,
      children: <div>
        {
          newsList.map((item: any) => {
            if (item.category === 3) {
              return <Card
                key={item._id}
                onClick={() => { goDetail(item._id) }}
                hoverable
                style={{ width: '100%', marginBottom: 15 }}
              >
                <Meta
                  avatar={
                    <Image
                      width={200}
                      src={item?.cover ? item.cover.thumbUrl : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
                    />
                  }
                  title={item.title}
                  description={dayjs(item.editTime).format('YYYY-MM-DD HH:mm:ss')}
                />
              </Card>
            }
          })
        }
      </div>,
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
          style={{ width: '100%' }}
          defaultActiveKey="1"
          items={items}
          onChange={tabOnChange}
        />
      </Row>
    </div>
  );
};

export default News;
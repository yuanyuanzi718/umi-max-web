import React, { useEffect, useState } from 'react'
import { request } from '@umijs/max'
import { List } from 'antd';

const Product: React.FC = () => {

  const [productList, setproductList] = useState<any>([])

  useEffect(() => {
    request('/webapi/product/list').then(res => {
      if (res.success) {
        setproductList(res.data.list)
      }
    })
  }, [])

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={productList}
        renderItem={(item: any) => (
          <List.Item
            key={item.title}
            extra={
              <img
                width={272}
                alt="logo"
                src={item?.cover ? item.cover.thumbUrl : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"}
              />
            }
          >
            <List.Item.Meta
              title={item.title}
              description={item.introduction}
            />
            {item.detail}
          </List.Item>
        )}
      /></div>
  )
}
export default Product
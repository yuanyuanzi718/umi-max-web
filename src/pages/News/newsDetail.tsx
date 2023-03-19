import React, { useEffect } from 'react';
import { useParams } from '@umijs/max';

const NewsDetail: React.FC = () => {
  const params = useParams();
  useEffect(() => {
    console.log(params, 'pros');
  }, [])
  return (
    <div>
      新闻详情
    </div>
  )
}
export default NewsDetail
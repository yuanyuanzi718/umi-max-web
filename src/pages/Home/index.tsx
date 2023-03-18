import React from 'react';
import { Carousel } from 'antd';
import styles from './index.less'

const Home: React.FC = () => {

  return (
    <Carousel autoplay className={styles.carousel}>
      <div className={styles.contentStyle1}>
      </div>
      <div className={styles.contentStyle2}>
      </div>
      <div className={styles.contentStyle3}>
      </div>
    </Carousel>
  );
};

export default Home;
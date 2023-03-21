import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  title: '新闻社',
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  // layout: {},
  routes,
  npmClient: 'npm',
  proxy: {
    '/webapi': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      // 'pathRewrite': { '^/adminapi': '' },
    },
  },
});

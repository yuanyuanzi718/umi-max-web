export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: '@/pages/Layout',
    routes: [
      { exact: true, path: '/home', component: '@/pages/Home' },
      { exact: true, path: '/news', component: '@/pages/News' },
      { exact: true, path: '/product', component: '@/pages/Product' },
      { exact: true, path: '/admin' },
      { exact: true, path: '/news/:id', component: '@/pages/News/newsDetail.tsx' },
    ],
  },
  { exact: true, path: '/table', component: '@/pages/Table', layout: false, },
  { path: '*', component: '@/pages/404.tsx', layout: false, },
];

export default [
  {
    path: '/',
    component: '@/pages/Layout',
    layout: false,
    exact: true,
  },
  { path: '*', component: '@/pages/404.tsx', layout: false, },
];

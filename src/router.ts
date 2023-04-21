const Routes: any = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/",
    hideInMenu: true,
    component: "components/xhead/index",
    children: [],
  },
  {
    name: "404",
    path: "*",
    component: 'pages/404'
  },
  {
    name: "铸天页面",
    path: "/index",
    component: "pages/index/index",
  },
  {
    name: "formily设计器",
    path: "/formily",
    component: "pages/formily/index",
  }
];

export { Routes };

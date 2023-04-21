const Routes  = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/",
    hideInMenu: true,
    component: "components/xhead/index",
    children: [
        {
          name: "用户管理",
          icon: "zt-jichushuju",
          hideInMenu: true,
          access: "用户管理",
          path: "/index",
          children: [
            {
              name: "首页",
              hideInMenu: true,
              access: "",
              path: "/index",
              component: "pages/index/index",
            }
          ],
        },
        {
          name: "系统管理",
          icon: "zt-xitongguanli",
          hideInMenu: true,
          access: "系统管理",
          path: "/demo",
          children: [
            {
              name: "demo",
              hideInMenu: true,
              access: "demo",
              path: "/demo",
              component: "pages/demo/index",
            },

          ],
        },
    ],
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

export default Routes

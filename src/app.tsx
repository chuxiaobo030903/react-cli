import { useState, useEffect } from 'react'
import { HashRouter,useRoutes } from 'react-router-dom';
import { _mobx, observer } from "@/store/index";
import {syncRouter} from "@/components/zt-router";
import { Routes } from "./router";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

let routeElement: any = [];

const App = () => {
  const _ = require("lodash");
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    init()
  }, [])

  const init = async ()=>{
    //TODO 动态获取路由及权限数据
    // const userAuthority = await accessData()
    // window.sessionStorage.setItem("userAuthInfo", JSON.stringify(userAuthority));
    const routers:any = await getRouters();
    Routes[routeIndex()].children = await jointRouter(routers);
    _mobx.xMobxRoute = Routes;
    routeElement = syncRouter(Routes);
    setIsShow(true);
  }

  const jointRouter = (routeData:any) => {
    let routeList: any = [];
    routeData.map((item: any) => {
      if ("children" in item) {
        let childrenList:any = jointRouter(item.children);
        if (childrenList.length < 1){
          return;
        }
        item.children = childrenList;
      }
      // // 菜单是否展示
      // if(item.hidden){
      //   return
      // }
      if(!_.isEmpty(item.children)){
        item = {name:item.meta.title,icon: item.meta.icon,hideInMenu:!item.hidden,path:item.path,children:item.children}
      }else{
        item = {name:item.meta.title,icon: item.meta.icon,hideInMenu:!item.hidden,path:item.path,component:item.component}
      }
      routeList.push(item);
    });
    return routeList;
  };

  const Main = () => useRoutes(routeElement);

  const routeIndex = () => {
    return _.findIndex(Routes, (itme: any) => { return itme.hideInMenu == true });
  };

  // 获取动态路由
  const getRouters = ()=>{
    return new Promise((res) => {
      setTimeout(() => {
        res(
          [
            {
              "name": "collection",
              "path": "/collection",
              "hidden": false,
              "redirect": "noRedirect",
              "component": "collection",
              "alwaysShow": true,
              "meta": {
                "title": "采集任务管理",
                "icon": "zt-jichushuju",
                "noCache": false,
                "link": null
              },
              "children": [
                {
                  "name": "assignment",
                  "path": "/collection",
                  "hidden": false,
                  "component": "pages/collection/assignment/index",
                  "meta": {
                    "title": "任务管理",
                    "icon": "user",
                    "noCache": false,
                    "link": null
                  }
                },
                {
                  "name": "assignment-add",
                  "path": "/collection/assignment/add",
                  "hidden": true,
                  "component": "pages/collection/assignment/add/index",
                  "meta": {
                    "title": "创建任务",
                    "icon": "user",
                    "noCache": false,
                    "link": null
                  }
                }
              ]
            },
            {
              "name": "Monitor",
              "path": "/monitor",
              "hidden": false,
              "redirect": "noRedirect",
              "component": "Layout",
              "alwaysShow": true,
              "meta": {
                "title": "系统管理",
                "icon": "zt-renwuguanli",
                "noCache": false,
                "link": null
              },
              "children": [
                {
                  "name": "Online",
                  "path": "online",
                  "hidden": false,
                  "component": "monitor/online/index",
                  "meta": {
                    "title": "要素分类管理",
                    "icon": "online",
                    "noCache": false,
                    "link": null
                  }
                },
                {
                  "name": "Online",
                  "path": "online",
                  "hidden": false,
                  "component": "monitor/online/index",
                  "meta": {
                    "title": "要素管理",
                    "icon": "online",
                    "noCache": false,
                    "link": null
                  }
                }
              ]
            },
            // {
            //   "name": "Monitor",
            //   "path": "/monitor",
            //   "hidden": false,
            //   "redirect": "noRedirect",
            //   "component": "Layout",
            //   "alwaysShow": true,
            //   "meta": {
            //     "title": "设备管理",
            //     "icon": "zt-xitongguanli",
            //     "noCache": false,
            //     "link": null
            //   }
            // },
            // {
            //   "name": "Monitor",
            //   "path": "/monitor",
            //   "hidden": false,
            //   "redirect": "noRedirect",
            //   "component": "Layout",
            //   "alwaysShow": true,
            //   "meta": {
            //     "title": "人员管理",
            //     "icon": "zt-yonghu-xianxing",
            //     "noCache": false,
            //     "link": null
            //   }
            // }
          ]
        );
      }, 100);
    });
  }

  return <>
    <HashRouter>
    <ConfigProvider locale={zhCN}>
      {isShow && <Main />}
    </ConfigProvider>
      </HashRouter>
  </>
}
export default observer(App);

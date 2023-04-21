import { useState, useEffect } from 'react'
import { HashRouter,useRoutes } from 'react-router-dom';
import { _mobx, observer } from "@/store/index";
import {syncRouter} from "zt-router";
import Routes from "./router";
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
    _mobx.xMobxRoute = Routes;
    routeElement = syncRouter(Routes);
    setIsShow(true);
  }
  const Main = () => useRoutes(routeElement);
  return <>
    <HashRouter>
        <ConfigProvider locale={zhCN}>{isShow && <Main />}</ConfigProvider>
    </HashRouter>
  </>
}
export default observer(App);

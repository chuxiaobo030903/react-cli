import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

//路由守卫方法
const syncRouter = (routeList:any) => {
  let RouteTable: any = [];
  routeList.map((itme: any) => {
    const routeObj = { ...itme };
    if (routeObj.path === undefined) {
      return;
    }
    if (routeObj.redirect) {
      routeObj.element = <Navigate to={routeObj.redirect} replace={true} />;
    }
    if (routeObj.component) {
      const Module = lazy(() => import("@/" + routeObj.component));
      //TODO 页面loading
      routeObj.element = <Suspense fallback={<></>}><Module /></Suspense>;
    }
    if (routeObj.children) {
      routeObj.children = syncRouter(itme.children);
    }
    RouteTable.push(routeObj);
  });
  return RouteTable;
};

//判断用户权限
const btnHasAuthority = (params:any) => {
  let permission = false;
  const userAuth = JSON.parse(window.sessionStorage.getItem("userAuthInfo") || "[]");
  if (userAuth.indexOf(params) != -1) {
    permission = true;
  }
  return permission;
};

//按钮权限判断方法
const Access: any = (props:any) => {
  return props.accessible ? props.children : null;
};

export {syncRouter,btnHasAuthority,Access};







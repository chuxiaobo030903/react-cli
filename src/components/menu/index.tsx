import { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutlet } from "react-router-dom";
import { _mobx } from "@/store/index";
import classNames from "classnames";
import "./index.less";

const Menu: any = () => {
  const _ = require("lodash");
  const location = useLocation();
  const navigate = useNavigate();
  const outlet: any = useOutlet(); //返回路由层次结构中这一层的所有路由的元素
  const [menuData, setmenuData] = useState<any>([]); //菜单数据

  useEffect(() => {
    setmenuData(_mobx.xMobxRoute[routeIndex()].children);
  }, []);

  // 获取当前路由信息定位高亮
  useEffect(() => {
    let MenuIndex: any = _.findIndex(_mobx.xMobxRoute[routeIndex()].children,(itme:any) => {
      return itme.name == outlet.props.children.props.match.route.name;
    });
    let menuDataArr: any = _mobx.xMobxRoute[routeIndex()].children;
    menuDataArr = recover(menuDataArr);
    menuDataArr[MenuIndex].isSpread = true;
    menuDataArr[MenuIndex].isHighlight = true;
    //判断是否有子菜单
    if (outlet.props.children.props.match.route.children) {
      let MenuItmeIndex: any = _.findIndex(outlet.props.children.props.match.route.children,(itme: any) => {
        return itme.path == location.pathname;
      });
      if(MenuItmeIndex<0){
       return navigate('404');
      }
      menuDataArr[MenuIndex].children[MenuItmeIndex].isHighlight = true;
    }
    setmenuData([...menuDataArr]);
  }, [location.pathname]);

  //一级菜单点击方法
  const menuChange = (itme: any, index: any) => {
    let menuDataArr: any = menuData;
    menuDataArr[index].isSpread = menuDataArr[index].isSpread ? false : true;
    setmenuData([...menuDataArr]);
    if (!itme.children) {
      navigate(itme.path);
    }
  };
  // 二级菜单点击方法
  const menuItmeChange = (itmes: any) => {
    navigate(itmes.path);
  };

  const routeIndex = () => {
    return _.findIndex(_mobx.xMobxRoute, (itme: any) => { return itme.hideInMenu == true });
  };

  // 清除高亮展开状态
  const recover = (data: any) => {
    data.map((itme: any) => {
      itme.isSpread = false;
      itme.isHighlight = false;
      if (itme.children) {
        itme.children.map((itmes: any) => {
          itmes.isHighlight = false;
          return itmes;
        });
      }
      return itme;
    });
    return data;
  };

  return (
    <>
      <div className="zt-menu">
        {menuData.map((itme: any, index: any) => {
          return (
            <div key={index}>
              {itme.hideInMenu && (
                <div className={"zt-menu-title " + classNames(itme.isHighlight ? "zt-title-selected" : "")}
                  onClick={() => menuChange(itme, index)}
                >
                  <i className={"f14 zt-iconfont " + itme.icon}></i>
                  <span className="ml10 f15">{itme.name}</span>
                  {itme.children && (
                    <i className={ "f12 zt-menu-btn zt-iconfont " + classNames(itme.isSpread ? "zt-xiangshang" : "zt-xiangxia")}></i>
                  )}
                </div>
              )}
              {itme.hideInMenu && itme.children && menuData[index].isSpread &&
                itme?.children?.map((itmes: any, indexs: any) => {
                  return (
                    <div key={indexs}>
                      {itmes.hideInMenu && (
                        <div
                          className="pr"
                          onClick={() => menuItmeChange(itmes)}
                        >
                          <div
                            className={
                              "zt-menu-item cp " +
                              classNames(
                                itmes.isHighlight ? "zt-menu-item-selected" : ""
                              )
                            }
                          >
                            {itmes.name}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Menu;

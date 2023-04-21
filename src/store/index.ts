import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
class $ {
  constructor() {
    makeAutoObservable(this);
  }
  xMobx:any = "测试mbox变量";
  xMobxRoute:any = []; //路由菜单数据
}
const _mobx = new $();
export { _mobx, observer };

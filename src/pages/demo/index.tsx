import { useEffect } from "react";
import "./index.less";
import { observer, _mobx } from "@/store/index";

const Demo: any = () => {

  useEffect(() => {
    initPage();
  }, []);

  const initPage = async () => {

  };


  return (
    <div className="demo-page">
       <div className="tc f30 fb">demo页面</div>
    </div>
  )
};

export default observer(Demo);

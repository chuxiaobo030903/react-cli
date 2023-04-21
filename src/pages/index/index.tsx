import { useEffect } from "react";
import {useSearchParams} from 'react-router-dom'
import "./index.less";
import { observer, _mobx } from "@/store/index";

const Index: any = () => {

  const [search,setsearch] = useSearchParams()

  useEffect(() => {
    initPage();
  }, []);

  const initPage = async () => {

  };


  return (
    <div className="index-page">
       <div className="tc f30 fb">铸天页面</div>
    </div>
  )
};

export default observer(Index);

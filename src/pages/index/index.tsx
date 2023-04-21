import React,{ useEffect, useRef, useState } from "react";
import Xhead from "@/components/xhead";
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
      <div className="index-xhead">
        <Xhead isShow={true}/>
      </div>
       <div className="mt100 tc f30 fb">铸天页面</div>
    </div>
  )
};

export default observer(Index);

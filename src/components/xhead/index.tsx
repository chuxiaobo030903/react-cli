import { Outlet } from 'react-router-dom'
import Menu from '../menu'
import './index.less';
const Xhead: any = (props:any)=> {

  const _ = require("lodash");
  const isShow = _.isEmpty(props);

  return <>
    <div className="zt-layout">
        <div className="zt-layout-header">
            <div className='ml20'>顶部导航栏</div>
        </div>
        { isShow &&
          <div className='zt-layout-main'>
            {/* 左侧导航栏 */}
            <div className='zt-layout-left'>
              <Menu />
            </div>
            <div className='zt-layout-right'>
              <div className='zt-layout-content'>
                <Outlet />
              </div>
            </div>
          </div>
        }
    </div>
  </>
};

export default Xhead;

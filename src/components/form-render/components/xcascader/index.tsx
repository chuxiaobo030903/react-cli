
import { connect, mapProps } from '@formily/react'
import { Cascader } from 'antd';

const Xcascader = connect(
  Cascader,
  mapProps((props:any, field) => {
    return {...props}
  })
)

export default Xcascader

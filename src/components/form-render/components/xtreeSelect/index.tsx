
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { TreeSelect } from 'antd'
const { SHOW_PARENT } = TreeSelect;

const XtreeSelect = connect(
  TreeSelect,
  mapProps((props:any, field) => {
    props.treeCheckable = true;
    props.showCheckedStrategy = SHOW_PARENT;
    return {...props}
  })
)

export default XtreeSelect

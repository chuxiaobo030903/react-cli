import React from 'react'
import { observer } from '@formily/reactive-react'
import { DroppableWidget } from '@designable/react'
import './styles.less'

let DroppableWidgets:any = DroppableWidget;
export const Container: React.FC = observer((props) => {
  return <DroppableWidgets>{props.children}</DroppableWidgets>
})

export const withContainer = (Target: React.JSXElementConstructor<any>) => {
  return (props: any) => {
    return (
      <DroppableWidgets>
        <Target {...props} />
      </DroppableWidgets>
    )
  }
}

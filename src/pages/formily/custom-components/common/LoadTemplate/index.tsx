import React from 'react'
import { NodeActionsWidget } from '@designable/react'

let NodeActionsWidgets:any = NodeActionsWidget;
export interface ITemplateAction {
  title: React.ReactNode
  tooltip?: React.ReactNode
  icon?: string | React.ReactNode
  onClick: () => void
}

export interface ILoadTemplateProps {
  className?: string
  style?: React.CSSProperties
  actions?: ITemplateAction[]
}

export const LoadTemplate: React.FC<ILoadTemplateProps> = (props) => {
  return (
    <NodeActionsWidgets>
      {props.actions?.map((action, key) => {
        return <NodeActionsWidget.Action {...action} key={key} />
      })}
    </NodeActionsWidgets>
  )
}

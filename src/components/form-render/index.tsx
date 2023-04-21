import React, { useEffect,useMemo,useImperativeHandle,forwardRef,useCallback} from "react"
import { createForm } from "@formily/core"
import { createSchemaField } from "@formily/react"
import {Form,FormItem,DatePicker,Checkbox,Cascader,Editable,Input,NumberPicker,Switch,Password,PreviewText,
  Radio,Reset,Select,Space,Submit,TimePicker,Transfer,TreeSelect,Upload,FormGrid,FormLayout,FormTab,FormCollapse,
  ArrayTable,ArrayCards } from "@formily/antd"
import { Card, Slider, Rate } from "antd"
//自定义组件
import * as xcustom from './components/index';
import './index.less';

const Text: any = ({ value, mode, content, ...props }) => {
  const tagName = mode === "normal" || !mode ? "div" : mode
  return React.createElement(tagName, props, value || content)
}

const FormRender = forwardRef((props:any,parentRef) => {

  const SchemaField = useCallback(createSchemaField({
    components: {...xcustom,...props.xComponents,Space,FormGrid,FormLayout,FormTab,FormCollapse,ArrayTable,ArrayCards,FormItem,DatePicker,
      Checkbox,Cascader,Editable,Input,Text,NumberPicker,Switch,Password,PreviewText,Radio,Reset,Select,
      Submit,TimePicker,Transfer,TreeSelect,Upload,Card,Slider,Rate
    },
    scope: {...props.schemaScope}
  }),[])

  const formRender = useMemo(() => createForm(), []);


  // 表单提交方法
  const autoSubmit = (fromValue)=>{
    props.onSubmit(fromValue)
  }
  // 表单校验方法
  const autoSubmitFailed = (messages)=>{
    props.onSubmitFailed(messages)
  }

  useImperativeHandle(parentRef, () => ({formRender}));

  return <>
    <div className="form-render">
      <Form layout={props.layout}  form={formRender} labelCol={props.schema.form.labelCol} wrapperCol={props.schema.form.wrapperCol} onAutoSubmit={autoSubmit}
        onAutoSubmitFailed={autoSubmitFailed}>
        <SchemaField schema={props.schema.schema}></SchemaField>
        <div className="xxm">
          {props.Slots && <props.Slots />}
        </div>
      </Form>
    </div>
  </>
})

export default FormRender;


import 'antd/dist/antd.less'
import { useMemo } from 'react'
import {
  Designer, //设计器根组件，主要用于下发上下文
  DesignerToolsWidget, //画板工具挂件
  ViewToolsWidget, //视图切换工具挂件
  Workspace, //工作区组件，核心组件，用于管理工作区内的拖拽行为，树节点数据等等...
  OutlineTreeWidget, //大纲树组件，它会自动识别当前工作区，展示出工作区内树节点
  ResourceWidget, //拖拽源挂件
  HistoryWidget, //历史记录挂件
  StudioPanel, //主布局面板
  CompositePanel, //左侧组合布局面板
  WorkspacePanel, //工作区布局面板
  ToolbarPanel, //工具栏布局面板
  ViewportPanel, //视口布局面板
  ViewPanel, //视图布局面板
  SettingsPanel, //右侧配置表单布局面板
  ComponentTreeWidget, //组件树渲染器
} from '@designable/react'
import { SettingsForm } from '@designable/react-settings-form'
import {createDesigner,GlobalRegistry,Shortcut,KeyCode } from '@designable/core'
import {LogoWidget,ActionsWidget,PreviewWidget,SchemaEditorWidget,MarkupSchemaWidget} from './widgets'
import { saveSchema } from './service'
import {Form,Field,Input,Select,TreeSelect,Cascader,Radio,Checkbox,Slider,Rate,NumberPicker,Transfer,Password,
  DatePicker,TimePicker,Upload,Switch,Text,Card,ArrayCards,ObjectContainer,ArrayTable,Space,FormTab,FormCollapse,
  FormLayout,FormGrid } from './custom-components'

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件',
    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays',
    },
  },
})

let Designers:any = Designer;
let StudioPanels:any = StudioPanel;
let CompositePanels:any = CompositePanel;
let Workspaces:any = Workspace;
let WorkspacePanels:any = WorkspacePanel;
let ToolbarPanels:any = ToolbarPanel;
let ViewportPanels:any = ViewportPanel;
let SettingsPanels:any = SettingsPanel;

const Formily = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(ctx) {
              saveSchema(ctx.engine)
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    []
  )
  return (
    <Designers engine={engine}>
      <StudioPanels logo={<LogoWidget />} actions={<ActionsWidget />}>
        <CompositePanels>
          <CompositePanels.Item title="panels.Component" icon="Component">
            <ResourceWidget
              title="sources.Inputs"
              sources={[
                Input,
                Password,
                NumberPicker,
                Rate,
                Slider,
                Select,
                TreeSelect,
                Cascader,
                Transfer,
                Checkbox,
                Radio,
                DatePicker,
                TimePicker,
                Upload,
                Switch,
                ObjectContainer,
              ]}
            />
            <ResourceWidget
              title="sources.Layouts"
              sources={[
                Card,
                FormGrid,
                FormTab,
                FormLayout,
                FormCollapse,
                Space,
              ]}
            />
            <ResourceWidget
              title="sources.Arrays"
              sources={[ArrayCards, ArrayTable]}
            />
            <ResourceWidget title="sources.Displays" sources={[Text]} />
          </CompositePanels.Item>
          <CompositePanels.Item title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanels.Item>
          <CompositePanels.Item title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanels.Item>
        </CompositePanels>
        <Workspaces id="form">
          <WorkspacePanels>
            <ToolbarPanels>
              <DesignerToolsWidget />
              <ViewToolsWidget
                use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']}
              />
            </ToolbarPanels>
            <ViewportPanels>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Form,
                      Field,
                      Input,
                      Select,
                      TreeSelect,
                      Cascader,
                      Radio,
                      Checkbox,
                      Slider,
                      Rate,
                      NumberPicker,
                      Transfer,
                      Password,
                      DatePicker,
                      TimePicker,
                      Upload,
                      Switch,
                      Text,
                      Card,
                      ArrayCards,
                      ArrayTable,
                      Space,
                      FormTab,
                      FormCollapse,
                      FormGrid,
                      FormLayout,
                      ObjectContainer,
                    }}
                  />
                )}
              </ViewPanel>
              <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree, onChange) => (
                  <SchemaEditorWidget tree={tree} onChange={onChange} />
                )}
              </ViewPanel>
              <ViewPanel type="MARKUP" scrollable={false}>
                {(tree) => <MarkupSchemaWidget tree={tree} />}
              </ViewPanel>
              <ViewPanel type="PREVIEW">
                {(tree) => <PreviewWidget tree={tree} />}
              </ViewPanel>
            </ViewportPanels>
          </WorkspacePanels>
        </Workspaces>
        <SettingsPanels title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanels>
      </StudioPanels>
    </Designers>
  )
}
export default Formily;
import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { Button } from "antd";
import dayjs from "dayjs";
import _ from "lodash";

import FormRender from "@/components/form-render";

import "./index.less";

function QueryRender(props, parentRef) {
  const [schema, setSchema] = useState({});
  const formRef = useRef();

  useImperativeHandle(parentRef, () => ({ formRef }));

  useEffect(() => {
    const searchProperties = {};
    let index = 0;
    if (props.search) {
      searchProperties.search = {
        type: "string",
        title: "",
        "x-decorator": "FormItem",
        "x-component": "Input",
        "x-validator": [],
        "x-component-props": {
          allowClear: true,
          placeholder: props.search,
        },
        "x-decorator-props": {},
        "x-designable-id": "searchInput",
        "x-index": index,
        name: "name",
        description: "",
      };
      index += 1;
    }

    const { properties = {} } = props.schema?.schema || {};

    props.filters?.forEach((key) => {
      const item = properties[key];
      if (item) {
        // TODO: 优化
        const itemConf = {
          ...item,
          required: false,
          "x-index": index,
        };
        if (!itemConf["x-component-props"]) {
          itemConf["x-component-props"] = {};
        }
        itemConf["x-component-props"].allowClear = true;
        searchProperties[key] = itemConf;
        index += 1;
      } else if (key === "$timerange") {
        searchProperties[key] = {
          type: "string[]",
          title: "时间范围",
          "x-decorator": "FormItem",
          "x-component": "DatePicker.RangePicker",
          "x-validator": [],
          "x-component-props": {
            picker: "date",
            showTime: true,
            allowClear: true,
          },
          "x-decorator-props": {},
          name: key,
          "x-designable-id": key,
          "x-index": index,
        };
        index += 1;
      }
    });

    setSchema({
      form: {},
      schema: {
        type: "object",
        properties: searchProperties,
        "x-designable-id": "searchSchema",
      },
    });
  }, [props.search, props.filters, props.schema, props.schema?.schema]);

  function onSearch() {
    let query = _.cloneDeep(formRef?.current?.formRender?.values);
    if (props.filters?.includes("$timerange")) {
      console.log("query.$timerange?.[0]", query.$timerange?.[0]);
      if (query.$timerange?.[0] instanceof dayjs) {
        query.beginTime = query.$timerange?.[0]?.format("YYYY-MM-DD HH:mm:ss");
        query.endTime = query.$timerange?.[1]?.format("YYYY-MM-DD HH:mm:ss");
      } else {
        query.beginTime = query.$timerange?.[0];
        query.endTime = query.$timerange?.[1];
      }
      delete query.$timerange;
    }
    if (props.config?.queryMap) {
      query = props.config?.queryMap(query);
    }
    props.onSearch && props.onSearch(query);
  }

  return (
    <div className="query-render">
      {Object.keys(schema?.schema?.properties || {}).length > 0 ? (
        <>
          <FormRender
            ref={formRef}
            layout="inline"
            schema={schema}
            schemaScope={props.schemaScope}
            Slots={() => {
              return (
                <Button type="primary" onClick={onSearch}>
                  搜索
                </Button>
              );
            }}
            xComponents={props.xComponents}
          ></FormRender>
        </>
      ) : null}
    </div>
  );
}

export default forwardRef(QueryRender);

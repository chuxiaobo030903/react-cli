/*
model 不要定义在组件外部，避免出现 query 异常的情况。
- 异常情况：model 定义在组件函数外部（页面文件最外层），设置搜索条件，切换到其他页面后切换回来，上次设置的搜索条件还存在。
*/
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Button, message } from "antd";
import _ from "lodash";

import QueryRender from "./query-render";
import Pagination from "./pagination-render";
import TableRender from "./table-render";
import FormDialog from "./form-dialog";

import "./index.less";

const ListRender = forwardRef(function (props, parentRef) {
  const { idKey = "id" } = props;
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const formDialogRef = useRef();
  const queryRef = useRef();

  useImperativeHandle(parentRef, () => ({
    getList,
    onSearch,
    forceUpdate,
    formDialogRef,
    queryRef,
  }));

  const { schema = {}, config = {}, model = {} } = props;

  useEffect(() => {
    if (model) {
      if (!model.query) {
        model.query = {};
      }
      model.query.pageNum = 1;
    }
    !props.closeAutoRequest && getList();
  }, []);

  useEffect(() => {
    if (model && !model?.query) {
      model.query = {};
    }
  }, [model?.query]);

  function getList(query = model?.query || {}) {
    if (!model?.getList && Array.isArray(props.list)) {
      setListLoading(true);
      const { list } = props;
      const { pageNum = 1, pageSize = 10 } = model?.query || {};
      setList(list.slice(pageSize * (pageNum - 1), pageNum * pageSize));
      setTotal(list.length);
      props.onGetListEnd && props.onGetListEnd({ list, pagination: { pageNum, pageSize } });
      setListLoading(false);
      return;
    }
    if (!model?.getList) {
      return;
    }
    setListLoading(true);

    // remove $timerange
    const _q = _.cloneDeep(query);
    if (_q.$timerange !== undefined) {
      delete _q.$timerange;
    }

    model
      ?.getList(_q)
      .then((res) => {
        console.log("list res", res);
        setList(res.list);
        setTotal(res.pagination?.total);
        props.onGetListEnd && props.onGetListEnd(res);
        setListLoading(false);
      })
      .catch((err) => {
        console.log(err);
        message.error(err._message || "未知错误");
        setListLoading(false);
      });
  }

  function onPageChange(page, size) {
    if (model && !model.query) {
      model.query = {};
    }
    model.query.pageNum = page;
    model.query.pageSize = size;
    getList();
  }

  function onSearch(query) {
    if (model && !model.query) {
      model.query = {};
    }
    model.query.pageNum = 1;
    if (model && model.query && !model.query.pageSize) {
      model.query.pageSize = 10;
    }
    model.query = Object.assign(model.query, query);
    getList(query);
  }

  function forceUpdate() {
    setList((l) => _.cloneDeep(l));
  }

  function onCreate() {
    console.log("onCreate");
    formDialogRef.current.show().then(async (form) => {
      console.log("onCreate", form);
      const data = form;

      model
        ?.create(typeof model?.createMap === "function" ? model.createMap(data) : data)
        .then((res) => {
          onSearch();
          message.success(res._message || "新增成功");
        })
        .catch((err) => {
          console.error("err", err);
          message.error(err._message || "未知错误");
        });
    });
  }

  function onEdit(row, idx) {
    if (props.fetchOnEdit !== false) {
      model
        .get({ id: row[idKey] })
        .then((res) => {
          handleEdit(res, row[idKey]);
        })
        .catch((err) => {
          console.error("err", err);
          message.error(err._message || "未知错误");
        });
    } else {
      handleEdit(row);
    }
  }

  function handleEdit(data, id) {
    formDialogRef.current.show(data, "编辑").then(async (form) => {
      const data = form;
      model
        ?.update(typeof model?.updateMap === "function" ? model.updateMap(data) : data, { id })
        .then((res) => {
          getList();
          message.success(res?._message || "编辑成功");
        })
        .catch((err) => {
          console.error("err", err);
          message.error(err._message || "未知错误");
        });
    });
  }

  function onDel(row, idx) {
    model
      ?.delete({ id: row[idKey] })
      .then((res) => {
        message.success(res._message || "删除成功");
        onSearch();
      })
      .catch((err) => {
        message.error(err._message || "未知错误");
      });
  }

  const { Slots = {} } = props;

  return (
    <div className={`list-render ${props.className}`}>
      <div className="list-header">
        {props.hasQuery !== false ? (
          <QueryRender
            ref={queryRef}
            schema={props.schema}
            formConf={props.formConf}
            search={props.search}
            filters={props.filters}
            config={props.queryConf}
            onSearch={onSearch}
            schemaScope={props.schemaScope}
            xComponents={props.xComponents}
          />
        ) : (
          <div className="query-render"></div>
        )}
        <div className="header-actions-render">
          {Slots.headerActionPrefix && <Slots.headerActionPrefix />}
          {props.hasCreate !== false ? (
            <Button onClick={onCreate} type="primary">
              新增
            </Button>
          ) : null}
          {Slots.headerActionSuffix && <Slots.headerActionSuffix />}
        </div>
      </div>
      <TableRender
        idKey={idKey}
        schema={props.schema?.schema}
        list={list}
        formConf={props.formConf}
        config={props.tableConf}
        hasAction={props.hasAction}
        Slots={props.Slots}
        onEdit={onEdit}
        onDel={onDel}
        loading={listLoading}
      />
      <Pagination onChange={onPageChange} total={total} query={model?.query} />
      <FormDialog
        ref={formDialogRef}
        schema={schema}
        dialogConf={props.dialogConf}
        formConf={props.formConf}
        formSlots={props.formSlots}
        formInitialValues={props.formInitialValues}
        Slots={props.Slots}
        xComponents={props.xComponents}
        schemaScope={props.schemaScope}
      />
    </div>
  );
});

ListRender.defaultProps = {
  model: {
    query: {},
  },
};

export default ListRender;

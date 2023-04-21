import { useEffect, useState } from "react";
import { Button, Upload } from "antd";
import { connect, mapProps } from "@formily/react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
const { upload_url } = require("@config/config.local");

let defaultList = [];
let isInit = true;
const upload = (props: any) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.data;
      }
      return file;
    });
    setFileList(newFileList);
  };
  const prop = {
    action: upload_url,
    onChange: (e: any) => {
      handleChange(e);
      props.onChange && props.onChange(e);
    },
  };

  useEffect(() => {
    if (defaultList.length > 0 && isInit) {
      setFileList(defaultList);
      isInit = false;
    }
  }, [defaultList]);

  useEffect(() => {
    return () => {
      if (!isInit) {
        defaultList = [];
        isInit = true;
        setFileList([]);
      }
    };
  }, []);

  return (
    <Upload {...prop} fileList={fileList} >
      <Button icon={<UploadOutlined />}  disabled={props?.disabled||false}>上传</Button>
    </Upload>
  );
};

const Xupload = connect(
  upload,
  mapProps((props: any, field) => {
    if (props?.value && isInit) {
      defaultList = props.value;
    }
    return { ...props, form: field.form };
  }),
);

export default Xupload;

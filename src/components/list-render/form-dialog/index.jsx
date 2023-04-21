import { forwardRef, useEffect, useImperativeHandle, useRef, useState, useMemo } from "react";

import { Modal, Button, message } from "antd";

import FormRender from "hzab-form-render";

import "./index.less";

function FormDialog(props, parentRef) {
  const { Slots = {}, dialogConf = {} } = props;
  const [title, setTitle] = useState("新增");
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});
  const formRef = useRef();

  const FormSlot = useMemo(() => props.Slots?.FormSlot, [props.Slots?.FormSlot]);

  const resolveCB = useRef();
  const rejectCB = useRef();

  function show(formData = props.formInitialValues, title) {
    console.log("dialog show");
    setOpen(true);
    formRef.current?.formRender?.setValues(formData);
    setTitle(title || "新增");
    return new Promise((resolve, reject) => {
      resolveCB.current = resolve;
      rejectCB.current = reject;
    });
  }

  function close() {
    setOpen(false);
    formRef.current?.formRender?.reset();
  }

  function cancel() {
    close();
    rejectCB.current && rejectCB.current();
  }

  useImperativeHandle(parentRef, () => ({
    show,
    close,
    cancel,
    onOk,
  }));

  function onOk() {
    validate().then(async () => {
      const submitForm = _.cloneDeep(await formRef.current?.formRender?.values);
      if (dialogConf.beforeSubmit) {
        const isContinue = await dialogConf.beforeSubmit(submitForm, {
          cancel,
        });
        if (isContinue === false) {
          return;
        }
      }

      resolveCB.current && resolveCB.current(submitForm);
      props.onSubmit && props.onSubmit(submitForm);
      close();
    });
  }

  /**
   * 校验表单
   * @returns
   */
  function validate(hideMessage) {
    return new Promise((resolve, reject) => {
      formRef.current?.formRender
        ?.validate()
        .then((values) => {
          resolve(values);
        })
        .catch((err) => {
          reject(err);
          console.error("Error validate: ", err);
          !hideMessage && message.error("输入有误！");
        });
    });
  }

  let footer = undefined;
  if (dialogConf?.footer) {
    footer = dialogConf?.footer;
  } else {
    footer = [];
    const options = {
      cancel,
      onOk,
      close,
      form: formRef.current?.formRender,
      validate,
    };

    if (Slots.dialogFooterPre) {
      footer.push(<Slots.dialogFooterPre key="pre" options={options} />);
    }

    footer.push(
      <Button key="cancel" onClick={cancel}>
        {dialogConf.cancelText || "取 消"}
      </Button>,
    );

    if (Slots.dialogFooterCenter) {
      footer.push(<Slots.dialogFooterCenter key="center" options={options} />);
    }

    footer.push(
      <Button key="confirm" type="primary" onClick={onOk}>
        {dialogConf.okText || "确 定"}
      </Button>,
    );

    if (Slots.dialogFooterSuffix) {
      footer.push(<Slots.dialogFooterSuffix key="suffix" options={options} />);
    }
  }

  return (
    <Modal
      wrapClassName="form-dialog"
      title={title}
      visible={open}
      onCancel={cancel}
      onOk={onOk}
      footer={footer}
      forceRender
      width={dialogConf?.width}
    >
      {FormSlot ? (
        <FormSlot schema={props.schema?.schema} resolveCB={resolveCB} rejectCB={rejectCB} />
      ) : (
        <FormRender
          ref={formRef}
          schema={props.schema}
          schemaScope={props.schemaScope}
          xComponents={props.xComponents}
        ></FormRender>
      )}
    </Modal>
  );
}

export default forwardRef(FormDialog);

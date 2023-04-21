import { useEffect, useState,useCallback } from "react";
import { Input, Radio } from "antd";
import { connect, mapProps } from "@formily/react";




const radios = (props) => {
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    if(props.value){
      setValue(props.value);
    }
    if(props.form.getValuesIn('xother')){
      setInputValue(props.form.getValuesIn('xother'));
    }
  }, [props]);

  const onChange = (e) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={500}>500米</Radio>
      <Radio value={1000}>1000米</Radio>
      <Radio value={2000}>2000米</Radio>
      <Radio value={9999}>其他
        {value === 9999 ? (<Input value={inputValue} type={"Number"} placeholder={"请输入采集范围(米)"} style={{ width: 155, marginLeft: 10 }}
            onChange={(e: any) => {
              props.form.setValuesIn("xother", e.target.value)
            }}
          />
        ) : null}
      </Radio>
    </Radio.Group>
  );
};

const Xradio = connect(radios,mapProps((props: any, field) => {
    return { ...props, form: field.form };
  })
)
export default Xradio;

import _ from "lodash";
import dayjs from "dayjs";

const dateFormatEnum = {
  time: "YYYY-MM-DD HH:mm:ss",
  date: "YYYY-MM-DD",
};

/**
 * 获取 field 对应的值
 * @param {Object} field schema 项
 * @param {Object} data 数据
 * @param {Object} opt 配置项
 * @returns
 */
export function getVal(field = {}, data = {}, opt = {}) {
  let val = _.get(data, field.name);
  const { type } = field || {};
  const xComponent = field["x-component"];
  const xComponentProps = field["x-component-props"] || {};

  if (val && (type === "date-picker" || xComponent === "DatePicker" || xComponent === "DatePicker.RangePicker")) {
    const { picker, showTime } = xComponentProps || {};
    const mode = picker === "date" && showTime === true ? "time" : picker || "date";
    const _formatEnum = opt.dateFormatEnum || dateFormatEnum;
    const format = xComponentProps?.format || _formatEnum[mode];

    if (Array.isArray(val)) {
      return val.map((it) => getDateVal(it, format)).join(" ~ ");
    }
    return getDateVal(val, format);
  }

  if (val && (type === "time-picker" || xComponent === "TimePicker" || xComponent === "TimePicker.RangePicker")) {
    const format = xComponentProps?.format || "HH:mm:ss";
    if (Array.isArray(val)) {
      return val.map((it) => dayjs(it).format(format)).join(" ~ ");
    }
    return dayjs(val).format(format);
  }

  if (type === "switch") {
    if (val === undefined || val === false || val === field.inactiveValue) {
      return field.inactiveText || "否";
    }
    if (val === true || val === field.activeValue) {
      return field.activeText || "是";
    }
    return val;
  }
  if (typeof field.relation === "object") {
    const { key, name, label } = field.relation;
    return data[key]?.[name];
  }

  if (
    (xComponent === "Select" || xComponent === "Radio.Group" || xComponent === "Checkbox.Group") &&
    Array.isArray(field.enum)
  ) {
    if (!Array.isArray(val)) {
      return field.enum?.find((option) => option.value === val)?.label || val;
    } else if (xComponentProps.mode === "multiple" && Array.isArray(val)) {
      let _val = [];
      val.forEach((valIt) => {
        _val.push(field.enum?.find((option) => option.value === valIt)?.label || valIt);
      });
      val = _val;
    }
  }

  if (Array.isArray(val)) {
    return val.join("、");
  }

  return val;
}

export function getDateVal(val, format) {
  return dayjs(val).format(format);
}

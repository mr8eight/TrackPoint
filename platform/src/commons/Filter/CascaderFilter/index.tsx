import { Cascader } from "antd";
import type { CascaderProps, GetProp } from "antd";
import type { CascaderFilterProps, CascaderOption } from "@/commons/Filter";
import { useState } from "react";

type DefaultOptionType = GetProp<CascaderProps, "options">[number];

const CascaderFilter: React.FC<CascaderFilterProps> = ({
  placeholder = "Please Select",
  style = { width: 250 },
  multipleMode = true,
  options,
  value,
  onChange,
}) => {
  const [current, setCurrent] = useState(value);
  const onCascaderChange: CascaderProps<
    CascaderOption,
    "value",
    true
  >["onChange"] = (value) => {
    setCurrent(value);
    if (value && value.length > 0) {
      onChange(value);
    } else {
      onChange(undefined);
    }
  };

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );

  return (
    <Cascader
      options={options}
      value={current}
      onChange={onCascaderChange}
      showSearch={{ filter }}
      placeholder={placeholder}
      {...(multipleMode && {
        multiple: true,
      })}
      style={style}
    />
  );
};

export default CascaderFilter;

import { Cascader } from "antd";
import type { CascaderProps, GetProp } from "antd";
import type { CascaderFilterProps } from "@/commons/Filter";
import { useState } from "react";

type DefaultOptionType = GetProp<CascaderProps, "options">[number];

const CascaderFilter: React.FC<CascaderFilterProps> = ({
  options,
  value,
  onChange,
}) => {
  const [current, setCurrent] = useState(value);
  const onCascaderChange = (value) => {
    setCurrent(value);
    onChange(value);
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
      placeholder="Please Select"
    />
  );
};

export default CascaderFilter;

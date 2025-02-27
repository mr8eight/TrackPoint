import { Select } from "antd";
import type { BaseFilterProps } from "@/commons/Filter";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";

const SelectFilter: React.FC<BaseFilterProps> = ({
  placeholder = "Please Select",
  style = { width: 250 },
  maxCount = 2,
  multipleMode = true,
  options,
  value,
  onChange,
}) => {
  const [current, setCurrent] = useState(value);
  const onSelectChange = (value: string[]) => {
    setCurrent(value);
    if (value.length > 0) {
      onChange(value);
    } else {
      onChange(undefined);
    }
  };
  const suffix = (
    <>
      <span>
        {current ? current.length : 0} / {maxCount}
      </span>
      <DownOutlined />
    </>
  );
  return (
    <Select
      allowClear
      showSearch
      autoClearSearchValue
      {...(multipleMode && { maxCount, suffixIcon: suffix, mode: "multiple" })}
      placeholder={placeholder}
      optionFilterProp="label"
      value={current}
      onChange={onSelectChange}
      options={options}
      style={style}
    />
  );
};

export default SelectFilter;

import { Select } from "antd";
import type { BaseFilterProps } from "@/commons/Filter";
import { useState } from "react";

const SelectFilter: React.FC<BaseFilterProps> = ({
  options,
  value,
  onChange,
}) => {
  const [current, setCurrent] = useState(value);
  const onSelectChange = (value: string) => {
    setCurrent(value);
    onChange(value);
  };
  return (
    <Select
      allowClear
      showSearch
      placeholder="Please Select"
      optionFilterProp="label"
      value={current}
      onChange={onSelectChange}
      options={options}
      style={{ width: "15em" }}
    />
  );
};

export default SelectFilter;

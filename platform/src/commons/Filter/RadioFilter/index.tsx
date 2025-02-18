import { Radio } from "antd";
import type { BaseFilterProps } from "@/commons/Filter";
import { useState } from "react";

const RadioFilter: React.FC<BaseFilterProps> = ({
  options,
  value,
  onChange,
}) => {
  const [current, setCurrent] = useState(value);
  const onRadioChange = (e) => {
    setCurrent(e.target.value);
    onChange(e.target.value);
  };
  return (
    <Radio.Group value={current} onChange={onRadioChange} options={options} />
  );
};

export default RadioFilter;

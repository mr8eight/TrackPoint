import { DatePicker, Select, Space } from "antd";
import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import type { DatePickerType, DateFilterProps } from "@/commons/Filter";

const { Option } = Select;

const DateFilter: React.FC<DateFilterProps> = ({
  value,
  onChange,
  startTime = "2025-01-01",
  endTime = dayjs().valueOf(),
}) => {
  const [type, setType] = useState<DatePickerType>("date");
  const [current, setCurrent] = useState<Dayjs>(value);

  useEffect(() => {
    if (current) {
      switch (type) {
        case "date": {
          onChange({
            showType: "hour",
            startTime: current.format("YYYY-MM-DD"),
            endTime: current.format("YYYY-MM-DD"),
          });
          break;
        }
        case "month": {
          onChange({
            showType: "day",
            startTime: current.startOf(type).format("YYYY-MM-DD"),
            endTime: current.endOf(type).format("YYYY-MM-DD"),
          });
          break;
        }
      }
    } else {
      onChange(undefined);
    }
  }, [type, current]);

  const startDate = dayjs(startTime).endOf("day"),
    endDate = dayjs(endTime).endOf("day");

  const startMonth = dayjs(startTime).endOf("month"),
    endMonth = dayjs(endTime).endOf("month");

  const disabledDate = (current: Dayjs, { type }: { type: DatePickerType }) => {
    switch (type) {
      case "date": {
        return (
          current.endOf("day") < startDate || current.endOf("day") > endDate
        );
      }
      case "month": {
        return (
          current.endOf("month") < startMonth ||
          current.endOf("month") > endMonth
        );
      }
    }
  };
  const onDateChange = (date: Dayjs) => {
    setCurrent(date);
  };

  return (
    <Space>
      <Select value={type} onChange={setType}>
        <Option value="date">按天</Option>
        <Option value="month">按月</Option>
      </Select>
      <DatePicker
        picker={type}
        value={current}
        disabledDate={disabledDate}
        onChange={onDateChange}
      />
    </Space>
  );
};

export default DateFilter;

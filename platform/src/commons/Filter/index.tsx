import { Dayjs } from "dayjs";
import CascaderFilter from "./CascaderFilter";
import DateFilter from "./DateFilter";
import PanelFilter from "./PanelFilter";
import SelectFilter from "./SelectFilter";
import RadioFilter from "./RadioFilter";

import type { DatePickerProps } from "antd";
import type { ReactElement } from "react";

export type DatePickerType = Extract<
  DatePickerProps["picker"],
  "date" | "month"
>;

export type Rule = "total" | "unique";

type ShowType = "hour" | "day";

export interface TimeRange {
  showType: ShowType;
  startTime: string;
  endTime: string;
}

interface Option {
  value: string;
  label: string;
}

export interface CascaderOption extends Option {
  children?: CascaderOption[];
}

export interface PanelFilterItems {
  label: string;
  name: string;
  item: ReactElement;
  button?: {
    type?: "regular" | "submit";
    item: ReactElement;
  };
}

export interface DateFilterProps {
  startTime?: string | number;
  endTime?: string | number;
  value?: Dayjs;
  onChange?: (value: TimeRange) => void;
}

export interface BaseFilterProps {
  placeholder?: string;
  style?: React.CSSProperties;
  multipleMode?: boolean;
  maxCount?: number;
  options: Option[];
  value?: Option["value"][] | Option["value"];
  onChange?: (value: Option["value"][] | Option["value"]) => void;
}

export interface CascaderFilterProps {
  placeholder?: string;
  style?: React.CSSProperties;
  multipleMode?: boolean;
  options: CascaderOption[];
  value?: CascaderOption["value"][][];
  onChange?: (value: CascaderOption["value"][][]) => void;
}

export interface PanelFilterProps {
  items: PanelFilterItems[];
  onSubmit: (values: any) => void;
}

export { CascaderFilter, DateFilter, PanelFilter, SelectFilter, RadioFilter };

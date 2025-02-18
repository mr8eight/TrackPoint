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
  selectTime: string | number;
}

interface Option {
  value: string;
  label: string;
}

interface CascaderOption extends Option {
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
  options: Option[];
  value?: Option["value"];
  onChange?: (value: Option["value"]) => void;
}

export interface CascaderFilterProps {
  options: CascaderOption[];
  value?: CascaderOption["value"][];
  onChange?: (value: CascaderOption["value"][]) => void;
}

export interface PanelFilterProps {
  items: PanelFilterItems[];
  onSubmit: (values: any) => void;
}

export { CascaderFilter, DateFilter, PanelFilter, SelectFilter, RadioFilter };

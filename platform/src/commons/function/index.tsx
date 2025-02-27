import type { TimeRange } from "@/commons/Filter";
import dayjs from "dayjs";

export const getChartTimeLength = ({ showType, startTime }: TimeRange) => {
  switch (showType) {
    case "day":
      return dayjs(startTime).daysInMonth();
    default:
      return 24;
  }
};

export const getChartTimeArr = (time: TimeRange) => {
  const { showType, startTime } = time;
  switch (showType) {
    case "day":
      let month = startTime.split("-")[1];
      return new Array(getChartTimeLength(time))
        .fill(0)
        .map((_, index) =>
          month.concat("-" + (index + 1).toString().padStart(2, "0"))
        );
    default:
      return new Array(24)
        .fill(0)
        .map((_, index) => index.toString().padStart(2, "0").concat(":00"));
  }
};

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  let timer: any;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

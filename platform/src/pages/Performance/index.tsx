import { useState, useEffect } from "react";
import { DatePicker, Segmented, Space } from "antd";
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LineChart from "./LineChartComponent";
import PerformanceBar from "./PerformanceBarComponent";
import styles from "./index.module.scss";

const PerformanceDashboard: React.FC = () => {
  const [dates, setDates] = useState<[Dayjs, Dayjs] | null>([dayjs().startOf('day'), dayjs().endOf('day')]);
  const [data, setData] = useState<any>(null);
  const [viewType, setViewType] = useState<'简略数据' | '详细数据'>('简略数据'); 
  const [avgValues, setAvgValues] = useState<{ FP: number, FCP: number, LCP: number, CLS: number } | null>(null);

  useEffect(() => {
    if (!dates || dates.length !== 2 || !dates[0] || !dates[1]) {
      return;
    }

    // 创建模拟数据
    const mock = new MockAdapter(axios);

    // 模拟 POST 请求并返回模拟数据
    mock.onPost('/api/performance').reply(200, {
      time: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
      metrics: {
        FP: {
          avg: [1700, 1800, 1600, 1800, 1400, 1300, 1200, 1300, 1000, 900, 1800, 1700, 1600, 1500, 900, 1300, 1200, 1300, 1500, 1250, 1200, 1400, 1300, 1200],
          max: [1800, 1900, 1700, 1900, 1500, 1400, 1300, 1600, 1500, 1200, 1900, 1800, 2000, 1600, 1500, 1400, 1300, 1900, 2100, 1500, 1250, 1500, 1400, 1300],
        },
        FCP: {
          avg: [1700, 1800, 1600, 1800, 1400, 1300, 1200, 1300, 1000, 900, 1800, 1700, 1600, 1500, 900, 1300, 1200, 1300, 1500, 1250, 1200, 1400, 1300, 1200],
          max: [1800, 1900, 1700, 1900, 1500, 1400, 1300, 1600, 1500, 1200, 1900, 1800, 2000, 1600, 1500, 1400, 1300, 1900, 2100, 1500, 1250, 1500, 1400, 1300],
        },
        LCP: {
          avg: [1700, 1800, 1600, 1800, 1400, 1300, 1200, 1300, 1000, 900, 1800, 1700, 1600, 1500, 900, 1300, 1200, 1300, 1500, 1250, 1200, 1400, 1300, 1200],
          max: [1800, 1900, 1700, 1900, 1500, 1400, 1300, 1600, 1500, 1200, 1900, 1800, 2000, 1600, 1500, 1400, 1300, 1900, 2100, 1500, 1250, 1500, 1400, 1300],
        },
        CLS: {
          avg: [0.1, 0.2, 0.15, 0.1, 0.05, 0.04, 0.03, 0.02, 0.01, 0.005, 0.004, 0.003, 0.002, 0.001, 0.0005, 0.0004, 0.0003, 0.0002, 0.0001, 0.00005, 0.00004, 0.00003, 0.00002, 0.00001],
          max: [0.2, 0.3, 0.25, 0.2, 0.15, 0.14, 0.13, 0.12, 0.11, 0.105, 0.104, 0.103, 0.102, 0.101, 0.1005, 0.1004, 0.1003, 0.1002, 0.1001, 0.10005, 0.10004, 0.10003, 0.10002, 0.10001],
        },
      },
      samples: [170, 180, 160, 150, 140, 130, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1],
    });

    const fetchData = async () => {
      // 发送 POST 请求，如果日期是同一天则显示小时数据，否则显示天数据
      const reqData = {
        url: "https://domain.com",
        showType: dates[0].isSame(dates[1], 'day') ? 'hour' : 'day',
        startTime: dates[0].format('YYYY-MM-DD'),
        endTime: dates[1].format('YYYY-MM-DD'),
      };

      const response = await axios.post('/api/performance', reqData);
      setData(response.data);

      // 计算简略数据，取的是平均值
      const calculateAvg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

      setAvgValues({
        FP: calculateAvg(response.data.metrics.FP.avg) / 1000,
        FCP: calculateAvg(response.data.metrics.FCP.avg) / 1000,
        LCP: calculateAvg(response.data.metrics.LCP.avg) / 1000,
        CLS: calculateAvg(response.data.metrics.CLS.avg),
      });
    };
    fetchData();
  }, [dates]);

  return (
    <>
      <Space>
        <Segmented<string>
          options={['简略数据', '详细数据']}
          value={viewType}
          onChange={(value) => setViewType(value as '简略数据' | '详细数据')}
        />
        <DatePicker.RangePicker
          value={dates}
          onChange={(dates) => setDates(dates as [Dayjs, Dayjs])}
        />
      </Space>
      {data && avgValues && (
        <>
          {viewType === '简略数据' ? (
            <div className={styles.chartContainer}>
              <PerformanceBar
                title="首次绘制时间 (FP/s)"
                data={[2.5, 1, 0.5]}
                markLineValue={avgValues.FP}
                markLineLabel={`${avgValues.FP.toFixed(2)}s`}
                max={4}
              />
              <PerformanceBar
                title="首次内容渲染时间 (FCP/s)"
                data={[1.8, 1.2, 2]}
                markLineValue={avgValues.FCP}
                markLineLabel={`${avgValues.FCP.toFixed(2)}s`}
                max={5}
              />
              <PerformanceBar
                title="最大内容渲染时间 (LCP/s)"
                data={[2.5, 1.5, 2]}
                markLineValue={avgValues.LCP}
                markLineLabel={`${avgValues.LCP.toFixed(2)}s`}
                max={6}
              />
              <PerformanceBar
                title="布局偏移量 (CLS)"
                data={[0.1, 0.25, 1]}
                markLineValue={avgValues.CLS}
                markLineLabel={`${avgValues.CLS.toFixed(2)}`}
                max={1}
              />
            </div>
          ) : (
            <div className={styles.chartContainer}>
              <LineChart title="首次绘制时间 (FP)" data={data.metrics.FP} time={data.time} yAxisName="时间 (ms)" />
              <LineChart title="首次内容渲染时间 (FCP)" data={data.metrics.FCP} time={data.time} yAxisName="时间 (ms)" />
              <LineChart title="最大内容渲染时间 (LCP)" data={data.metrics.LCP} time={data.time} yAxisName="时间 (ms)" />
              <LineChart title="布局偏移量 (CLS)" data={data.metrics.CLS} time={data.time} yAxisName="分数" />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PerformanceDashboard;
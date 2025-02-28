import { useState } from "react";
import { Segmented, Typography, Button, Empty, message } from "antd";
import { SearchOutlined, LineChartOutlined } from "@ant-design/icons";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import LineChart from "./LineChartComponent";
import PerformanceBar from "./PerformanceBarComponent";
import { DateFilter, PanelFilter, SelectFilter } from "@/commons/Filter";
import type { PanelFilterItems } from "@/commons/Filter";
import { BasePanel } from "@/commons/Panel";

const { Text } = Typography;

const PerformanceDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [viewType, setViewType] = useState<"简略数据" | "详细数据">("简略数据");
  const [avgValues, setAvgValues] = useState<{
    FP: number;
    FCP: number;
    LCP: number;
    DOMContentLoaded: number;
    loadTime: number;
    CLS: number;
  } | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const items: PanelFilterItems[] = [
    {
      label: "日期选择：",
      name: "date",
      item: <DateFilter />,
    },
    {
      label: "url选择：",
      name: "url",
      item: (
        <SelectFilter
          options={[
            { value: "https://domain0.com", label: "https://domain0.com" },
            { value: "https://domain1.com", label: "https://domain1.com" },
          ]}
          multipleMode={false}
        />
      ),
      button: {
        type: "submit",
        item: (
          <Button type="primary" icon={<SearchOutlined />} iconPosition="end">
            查询
          </Button>
        ),
      },
    },
  ];

  const onSubmit = (values: any) => {
    console.log(values);
    const msg = [];
    if (!values?.date) {
      msg.push("请选择日期！");
    }
    if (!values?.url) {
      msg.push("请选择url！");
    }
    if (msg.length > 0) {
      while (msg.length > 0) {
        messageApi.open({
          type: "error",
          content: msg.shift(),
        });
      }
    } else {
      messageApi.open({
        type: "success",
        content: "查询成功！",
      });
      // 创建模拟数据
      const mock = new MockAdapter(axios);

      // 模拟 POST 请求并返回模拟数据
      mock.onPost("/api/performance").reply(200, {
        time: [
          "00:00",
          "01:00",
          "02:00",
          "03:00",
          "04:00",
          "05:00",
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00",
        ],
        metrics: {
          FP: {
            avg: [
              1700, 1800, 1600, 1800, 1400, 1300, 1200, 1300, 1000, 900, 1800,
              1700, 1600, 1500, 900, 1300, 1200, 1300, 1500, 1250, 1200, 1400,
              1300, 1200,
            ],
            max: [
              1800, 1900, 1700, 1900, 1500, 1400, 1300, 1600, 1500, 1200, 1900,
              1800, 2000, 1600, 1500, 1400, 1300, 1900, 2100, 1500, 1250, 1500,
              1400, 1300,
            ],
          },
          FCP: {
            avg: [
              1700, 1800, 1600, 1800, 1400, 1300, 1200, 1300, 1000, 900, 1800,
              1700, 1600, 1500, 900, 1300, 1200, 1300, 1500, 1250, 1200, 1400,
              1300, 1200,
            ],
            max: [
              1800, 1900, 1700, 1900, 1500, 1400, 1300, 1600, 1500, 1200, 1900,
              1800, 2000, 1600, 1500, 1400, 1300, 1900, 2100, 1500, 1250, 1500,
              1400, 1300,
            ],
          },
          LCP: {
            avg: [
              1700, 1800, 1600, 1800, 1400, 1300, 1200, 1300, 1000, 900, 1800,
              1700, 1600, 1500, 900, 1300, 1200, 1300, 1500, 1250, 1200, 1400,
              1300, 1200,
            ],
            max: [
              1800, 1900, 1700, 1900, 1500, 1400, 1300, 1600, 1500, 1200, 1900,
              1800, 2000, 1600, 1500, 1400, 1300, 1900, 2100, 1500, 1250, 1500,
              1400, 1300,
            ],
          },
          DOMContentLoaded: {
            avg: [
              1700, 1800, 1600, 1800, 1400, 1300, 1200, 1300, 1000, 900, 1800,
              1700, 1600, 1500, 900, 1300, 1200, 1300, 1500, 1250, 1200, 1400,
              1300, 1200,
            ],
            max: [
              1800, 1900, 1700, 1900, 1500, 1400, 1300, 1600, 1500, 1200, 1900,
              1800, 2000, 1600, 1500, 1400, 1300, 1900, 2100, 1500, 1250, 1500,
              1400, 1300,
            ],
          },
          loadTime: {
            avg: [
              1700, 1800, 1600, 1800, 1400, 1300, 1200, 1300, 1000, 900, 1800,
              1700, 1600, 1500, 900, 1300, 1200, 1300, 1500, 1250, 1200, 1400,
              1300, 1200,
            ],
            max: [
              1800, 1900, 1700, 1900, 1500, 1400, 1300, 1600, 1500, 1200, 1900,
              1800, 2000, 1600, 1500, 1400, 1300, 1900, 2100, 1500, 1250, 1500,
              1400, 1300,
            ],
          },
          CLS: {
            avg: [
              0.1, 0.2, 0.15, 0.1, 0.05, 0.04, 0.03, 0.02, 0.01, 0.005, 0.004,
              0.003, 0.002, 0.001, 0.0005, 0.0004, 0.0003, 0.0002, 0.0001,
              0.00005, 0.00004, 0.00003, 0.00002, 0.00001,
            ],
            max: [
              0.2, 0.3, 0.25, 0.2, 0.15, 0.14, 0.13, 0.12, 0.11, 0.105, 0.104,
              0.103, 0.102, 0.101, 0.1005, 0.1004, 0.1003, 0.1002, 0.1001,
              0.10005, 0.10004, 0.10003, 0.10002, 0.10001,
            ],
          },
        },
      });

      const fetchData = async () => {
        // 发送 POST 请求，如果日期是同一天则显示小时数据，否则显示天数据
        const reqData = values;

        const response = await axios.post("/api/performance", reqData);
        setData(response.data);

        // 计算简略数据，取的是平均值
        const calculateAvg = (arr: number[]) =>
          arr.reduce((a, b) => a + b, 0) / arr.length;

        setAvgValues({
          FP: calculateAvg(response.data.metrics.FP.avg) / 1000,
          FCP: calculateAvg(response.data.metrics.FCP.avg) / 1000,
          LCP: calculateAvg(response.data.metrics.LCP.avg) / 1000,
          DOMContentLoaded: calculateAvg(response.data.metrics.DOMContentLoaded.avg) / 1000,
          loadTime: calculateAvg(response.data.metrics.loadTime.avg) / 1000,
          CLS: calculateAvg(response.data.metrics.CLS.avg),
        });
      };
      fetchData();
    }
  };

  return (
    <>
      <Text style={{ fontSize: "2em" }}>性能分析</Text>
      <PanelFilter items={items} onSubmit={onSubmit} />
      <BasePanel headerText="数据展示" headerIcon={<LineChartOutlined />}>
        {data && avgValues ? (
          <>
            <BasePanel.Item>
              <Segmented<string>
                options={["简略数据", "详细数据"]}
                value={viewType}
                onChange={(value) =>
                  setViewType(value as "简略数据" | "详细数据")
                }
              />
            </BasePanel.Item>
            {viewType === "简略数据" ? (
              <>
                <BasePanel.Item>
                  <PerformanceBar
                    title="首次绘制时间 (FP/s)"
                    data={[2.5, 1, 0.5]}
                    markLineValue={avgValues.FP}
                    markLineLabel={`${avgValues.FP.toFixed(2)}s`}
                    max={4}
                  />
                </BasePanel.Item>
                <BasePanel.Item>
                  <PerformanceBar
                    title="首次内容渲染时间 (FCP/s)"
                    data={[1.8, 1.2, 2]}
                    markLineValue={avgValues.FCP}
                    markLineLabel={`${avgValues.FCP.toFixed(2)}s`}
                    max={5}
                  />
                </BasePanel.Item>
                <BasePanel.Item>
                  <PerformanceBar
                    title="最大内容渲染时间 (LCP/s)"
                    data={[2.5, 1.5, 2]}
                    markLineValue={avgValues.LCP}
                    markLineLabel={`${avgValues.LCP.toFixed(2)}s`}
                    max={6}
                  />
                </BasePanel.Item>
                <BasePanel.Item>
                  <PerformanceBar
                    title="DOM渲染完成时间 "
                    data={[1.5, 1, 1.5]}
                    markLineValue={avgValues.DOMContentLoaded}
                    markLineLabel={`${avgValues.DOMContentLoaded.toFixed(2)}s`}
                    max={4}
                  />
                </BasePanel.Item>
                <BasePanel.Item>
                  <PerformanceBar
                    title="内容加载完成时间"
                    data={[2, 1.5, 1.5]}
                    markLineValue={avgValues.loadTime}
                    markLineLabel={`${avgValues.loadTime.toFixed(2)}s`}
                    max={5}
                  />
                </BasePanel.Item>
                <BasePanel.Item>
                  <PerformanceBar
                    title="布局偏移量 (CLS)"
                    data={[0.1, 0.15, 0.75]}
                    markLineValue={avgValues.CLS}
                    markLineLabel={`${avgValues.CLS.toFixed(2)}`}
                    max={1}
                  />
                </BasePanel.Item>
              </>
            ) : (
              <>
                <BasePanel.Item>
                  <LineChart
                    title="首次绘制时间 (FP)"
                    data={data.metrics.FP}
                    time={data.time}
                    yAxisName="花费时间 (ms)"
                  />
                </BasePanel.Item>
                <BasePanel.Item>
                  <LineChart
                    title="首次内容渲染时间 (FCP)"
                    data={data.metrics.FCP}
                    time={data.time}
                    yAxisName="花费时间  (ms)"
                  />
                </BasePanel.Item>
                <BasePanel.Item>
                  <LineChart
                    title="最大内容渲染时间 (LCP)"
                    data={data.metrics.LCP}
                    time={data.time}
                    yAxisName="花费时间  (ms)"
                  />
                </BasePanel.Item>
                <BasePanel.Item>
                  <LineChart
                    title="DOM渲染完成时间"
                    data={data.metrics.DOMContentLoaded}
                    time={data.time}
                    yAxisName="花费时间  (ms)"
                  />
                </BasePanel.Item>
                <BasePanel.Item>
                  <LineChart
                    title="内容加载完成时间"
                    data={data.metrics.loadTime}
                    time={data.time}
                    yAxisName="花费时间  (ms)"
                  />
                </BasePanel.Item>
                <BasePanel.Item>
                  <LineChart
                    title="布局偏移量 (CLS)"
                    data={data.metrics.CLS}
                    time={data.time}
                    yAxisName="分数"
                  />
                </BasePanel.Item>
              </>
            )}
          </>
        ) : (
          <BasePanel.Item>
            <Empty
              style={{ width: "100%" }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </BasePanel.Item>
        )}
      </BasePanel>
      {contextHolder}
    </>
  );
};

export default PerformanceDashboard;

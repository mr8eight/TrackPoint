import { useState } from "react";
import { Segmented, Typography, Button, Empty, message } from "antd";
import { SearchOutlined, LineChartOutlined } from "@ant-design/icons";
import axios from "axios";
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
      
      const { showType, startTime, endTime } = values.date;

      const fetchData = async () => {
        // 发送 POST 请求，如果日期是同一天则显示小时数据，否则显示天数据
        try {
          const response = await axios.post(
            "http://localhost:3000/tracking/performance",
            { startTime, endTime }
          );

          if (response.data.state !== 0) {
            messageApi.open({
              type: "error",
              content: response.data.message || "查询失败",
            });
            return;
          }

          const responseData = response.data.data;
          setData(responseData);

          // 计算简略数据，取的是平均值
          const calculateAvg = (arr: number[]) =>
            arr.reduce((a, b) => a + b, 0) / arr.length;

          setAvgValues({
            FP: calculateAvg(responseData.FP.avg) / 1000,
            FCP: calculateAvg(responseData.FCP.avg) / 1000,
            LCP: calculateAvg(responseData.LCP.avg) / 1000,
            DOMContentLoaded: calculateAvg(responseData.DOMContentLoaded.avg) / 1000,
            loadTime: calculateAvg(responseData.loadTime.avg) / 1000,
            CLS: calculateAvg(responseData.CLS.avg),
          });
        } catch (error) {
          console.error(error);
          messageApi.open({
            type: "error",
            content: "查询失败！",
          });
        }
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
                    data={data.FP}
                    time={data.timeDimension}
                    yAxisName="花费时间 (ms)"
                  />
                </BasePanel.Item>
                <BasePanel.Item>
                  <LineChart
                    title="首次内容渲染时间 (FCP)"
                    data={data.FCP}
                    time={data.timeDimension}
                    yAxisName="花费时间  (ms)"
                  />
                </BasePanel.Item>
                <BasePanel.Item>
                  <LineChart
                    title="最大内容渲染时间 (LCP)"
                    data={data.LCP}
                    time={data.timeDimension}
                    yAxisName="花费时间  (ms)"
                  />
                </BasePanel.Item>
                <BasePanel.Item>
                  <LineChart
                    title="DOM渲染完成时间"
                    data={data.DOMContentLoaded}
                    time={data.timeDimension}
                    yAxisName="花费时间  (ms)"
                  />
                </BasePanel.Item>
                <BasePanel.Item>
                  <LineChart
                    title="内容加载完成时间"
                    data={data.loadTime}
                    time={data.timeDimension}
                    yAxisName="花费时间  (ms)"
                  />
                </BasePanel.Item>
                <BasePanel.Item>
                  <LineChart
                    title="布局偏移量 (CLS)"
                    data={data.CLS}
                    time={data.timeDimension}
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

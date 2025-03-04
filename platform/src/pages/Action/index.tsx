import { useState } from "react";
import { Button, Typography, Empty, message } from "antd";
import { SearchOutlined, LineChartOutlined } from "@ant-design/icons";
import { DateFilter, PanelFilter, SelectFilter } from "@/commons/Filter";
import type { PanelFilterItems } from "@/commons/Filter";
import { BasePanel } from "@/commons/Panel";
import ReactECharts from "echarts-for-react";
import { getChartTimeArr } from "@/commons/function";
import { actionOptions } from "@/data";

const { Text } = Typography;

const items: PanelFilterItems[] = [
  {
    label: "日期选择：",
    name: "date",
    item: <DateFilter />,
  },
  {
    label: "行为选择：",
    name: "action",
    item: <SelectFilter options={actionOptions} multipleMode={false} />,
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

const Action: React.FC = () => {
  const [type, setType] = useState<"nodata" | "line">("nodata");
  const [option, setOption] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = (values: any) => {
    const msg = [];
    if (!values?.date) {
      msg.push("请选择日期！");
    }
    if (!values?.action) {
      msg.push("请选择行为！");
    }
    if (msg.length > 0) {
      while (msg.length > 0) {
        messageApi.open({
          type: "error",
          content: msg.shift(),
        });
      }
    } else {
      let timeArr = getChartTimeArr(values.date);
      let reqData = {
        startTime: values.date.startTime,
        endTime: values.date.endTime,
        action: values.action,
      };
      // 发送请求
      fetch("/tracking/eventStats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.state !== 0) {
            messageApi.open({
              type: "success",
              content: res.message,
            });
            const { pv, uv } = res.data;
            setOption({
              title: {
                text: `${reqData.startTime} ~ ${reqData.endTime}`,
                right: "right",
              },
              legend: {
                data: ["pv", "uv"],
              },
              tooltip: {
                trigger: "axis",
              },
              xAxis: {
                name: "时间",
                type: "category",
                boundaryGap: false,
                data: timeArr,
              },
              yAxis: {
                name: "次数",
                type: "value",
              },
              series: [
                {
                  name: "pv",
                  data: pv,
                  type: "line",
                },
                {
                  name: "uv",
                  data: uv,
                  type: "line",
                },
              ],
            });
            setType("line");
          } else {
            messageApi.open({
              type: "error",
              content: res.message,
            });
          }
        })
        .catch((error) => {
          messageApi.open({
            type: "error",
            content: error.message,
          });
        });
    }
  };
  return (
    <>
      <Text style={{ fontSize: "2em" }}>行为分析</Text>
      <PanelFilter items={items} onSubmit={onSubmit} />
      <BasePanel headerText="数据展示" headerIcon={<LineChartOutlined />}>
        {type === "nodata" && (
          <BasePanel.Item>
            <Empty
              style={{ width: "100%" }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </BasePanel.Item>
        )}
        {type === "line" && (
          <BasePanel.Item>
            <ReactECharts option={option} notMerge style={{ width: "100%" }} />
          </BasePanel.Item>
        )}
      </BasePanel>
      {contextHolder}
    </>
  );
};

export default Action;

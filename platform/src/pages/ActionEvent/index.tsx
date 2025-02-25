import { useState } from "react";
import { Button, Typography, Empty, message } from "antd";
import { SearchOutlined, LineChartOutlined } from "@ant-design/icons";
import {
  DateFilter,
  CascaderFilter,
  PanelFilter,
  RadioFilter,
} from "@/commons/Filter";
import type { PanelFilterItems } from "@/commons/Filter";
import { BasePanel } from "@/commons/Panel";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ReactECharts from "echarts-for-react";

const { Text } = Typography;

const actionOptions = [
  {
    label: "行为",
    value: "action",
    children: [
      {
        label: "点击注册按钮",
        value: "clickRegisterButton",
      },
      {
        label: "点击登录按钮",
        value: "clickLoginButton",
      },
    ],
  },
];

const radioOptions = [
  {
    value: "total",
    label: "总次数（含重复用户）",
  },
  {
    value: "unique",
    label: "去重次数（独立用户）",
  },
];

const items: PanelFilterItems[] = [
  {
    label: "日期选择：",
    name: "date",
    item: <DateFilter />,
  },
  {
    label: "行为选择：",
    name: "actions",
    item: <CascaderFilter options={actionOptions} />,
  },
  {
    label: "统计规则：",
    name: "rule",
    item: <RadioFilter options={radioOptions} />,
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

const ActionEvent: React.FC = () => {
  const [type, setType] = useState<"nodata" | "line">("nodata");
  const [option, setOption] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = (values: any) => {
    console.log(values);
    const msg = [];
    if (!values?.date) {
      msg.push("请选择日期！");
    }
    if (!values?.actions) {
      msg.push("请选择行为！");
    }
    if (!values?.rule) {
      msg.push("请选择统计规则！");
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
      const mock = new MockAdapter(axios);
      mock.onPost("/api/actionEvent").reply(200, {
        hours: new Array(24)
          .fill(0)
          .map((_, index) => index.toString().padStart(2, "0").concat(":00")),
        numbers: new Array(24)
          .fill(0)
          .map(() => Math.ceil(Math.random() * 1000)),
      });
      axios.post("/api/actionEvent", values).then((res) => {
        const { hours, numbers } = res.data;
        setOption({
          title: {
            text: "基础折线图",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["发生次数"],
          },
          xAxis: {
            name: "时间",
            type: "category",
            boundaryGap: false,
            data: hours,
          },
          yAxis: {
            name: "次数",
            type: "value",
          },
          series: [
            {
              name: "发生次数",
              data: numbers,
              type: "line",
            },
          ],
        });
        setType("line");
      });
    }
  };
  return (
    <>
      <Text style={{ fontSize: "2em" }}>事件分析</Text>
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
            <ReactECharts option={option} style={{ width: "100%" }} />
          </BasePanel.Item>
        )}
      </BasePanel>
      {contextHolder}
    </>
  );
};

export default ActionEvent;

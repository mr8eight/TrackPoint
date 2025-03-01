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
import { getChartTimeArr, getChartTimeLength } from "@/commons/function";

const { Text } = Typography;

const actionOptions = [
  {
    label: "点击行为",
    value: "点击行为",
    children: [
      {
        label: "点击注册按钮",
        value: "点击注册按钮",
      },
      {
        label: "点击登录按钮",
        value: "点击登录按钮",
      },
    ],
  },
  {
    label: "浏览行为",
    value: "浏览行为",
    children: [
      {
        label: "浏览注册页面",
        value: "浏览注册页面",
      },
      {
        label: "浏览登录页面",
        value: "浏览登录页面",
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

const Action: React.FC = () => {
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
      mock.onPost("/api/actionEvent").reply((config) => {
        const { date, actions } = JSON.parse(config.data);
        const timeLen = getChartTimeLength(date);

        return [
          200,
          {
            actions: actions.map((action) => ({
              label: action[action.length - 1],
              data: new Array(timeLen)
                .fill(0)
                .map(() => Math.ceil(Math.random() * 1000)),
            })),
          },
        ];
      });
      axios.post("/api/actionEvent", values).then((res) => {
        let timeArr = getChartTimeArr(values.date);

        const { actions } = res.data;

        setOption({
          title: {
            text: `${values.date.startTime} ~ ${values.date.endTime}`,
            right: "right",
          },
          legend: {
            data: actions.map(({ label }) => label),
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
          series: actions.map(({ label, data }) => ({
            name: label,
            data: data,
            type: "line",
          })),
        });
        setType("line");
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

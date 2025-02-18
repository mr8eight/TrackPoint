import { Button, Flex, Typography, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  DateFilter,
  CascaderFilter,
  PanelFilter,
  RadioFilter,
} from "@/commons/Filter";
import type { PanelFilterItems } from "@/commons/Filter";

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

const ActionEvent: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const onSubmit = (values) => {
    console.log(values);
    if (!values?.date) {
      messageApi.open({
        type: "error",
        content: "请选择日期！",
      });
    }
    if (!values?.actions) {
      messageApi.open({
        type: "error",
        content: "请选择行为！",
      });
    }
    if (!values?.rule) {
      messageApi.open({
        type: "error",
        content: "请选择统计规则！",
      });
    }
  };
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
  return (
    <>
      <Flex vertical gap="1em" style={{ padding: "0 7.5em" }}>
        <Text style={{ fontSize: "2em" }}>事件分析</Text>
        <PanelFilter items={items} onSubmit={onSubmit} />
      </Flex>
      {contextHolder}
    </>
  );
};

export default ActionEvent;

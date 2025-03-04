import { Button, Table, Typography, Empty, message } from "antd";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { PanelFilter, SelectFilter } from "@/commons/Filter";
import type { PanelFilterItems } from "@/commons/Filter";
import { urlOptions, errorOptions } from "@/data";

const { Text } = Typography;

interface DataType {
  key: string;
  url?: string;
  type?: string;
  time?: string;
  message: string;
}

const AlertButton = ({ record }: { record: DataType }) => {
  const handleAlert = () => {
    axios
      .post("/api/send-alert", { errorKey: record.key })
      .then(() => {
        message.success("报警通知已发送");
      })
      .catch(() => {
        message.error("报警通知发送失败");
      });
  };

  return (
    <Button type="primary" onClick={handleAlert}>
      报警
      <ExclamationCircleOutlined />
    </Button>
  );
};

const columns: TableProps<DataType>["columns"] = [
  {
    title: "URL",
    dataIndex: "url",
    key: "url",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: DataType) => <AlertButton record={record} />,
  },
];

const initialData: DataType[] = [
  {
    key: "1",
    url: "http://example.com",
    type: "JS Error",
    time: "2025-02-23 10:00:00",
    message: "Uncaught TypeError in app.js",
  },
  {
    key: "2",
    url: "http://example.com",
    type: "API Error",
    time: "2025-02-23 10:05:00",
    message: "500 Internal Server Error",
  },
  {
    key: "3",
    url: "http://example.com/assets",
    type: "Resource Error",
    time: "2025-02-23 10:10:00",
    message: "404 Not Found",
  },
];

const items: PanelFilterItems[] = [
  {
    label: "url选择：",
    name: "urls",
    item: <SelectFilter options={urlOptions} />,
  },
  {
    label: "异常类型选择：",
    name: "types",
    item: <SelectFilter options={errorOptions} />,
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

const Exception = () => {
  const [data, setData] = useState<DataType[]>(initialData);

  useEffect(() => {
    // 创建 axios-mock-adapter 实例并设置延时（可选）
    const mock = new MockAdapter(axios, { delayResponse: 300 });

    // 模拟 /api/get-errors 接口
    mock.onPost("/api/get-errors").reply((config) => {
      const { urls, types } = JSON.parse(config.data);
      return [
        200,
        {
          exceptions: initialData.filter(
            (item) =>
              (!urls.length || urls.includes(item.url)) &&
              (!types.length || types.includes(item.type))
          ),
        },
      ];
    });

    // 模拟 /api/send-alert 接口
    mock.onPost("/api/send-alert").reply(200);

    return () => {
      mock.restore();
    };
  }, []);

  const fetchErrors = async (params: any) => {
    try {
      const { data } = await axios.post("/api/get-errors", params, {
        headers: { "Content-Type": "application/json" },
      });
      setData(data.exceptions);
      message.success("查询成功！");
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("查询失败，请稍后重试");
    }
  };

  const onSubmit = (values: any) => {
    console.log(values);
    const msg = [];
    if (!values?.urls) {
      msg.push("请选择url！");
    }
    if (!values?.types) {
      msg.push("请选择异常类型！");
    }
    if (msg.length > 0) {
      while (msg.length > 0) {
        message.error(msg.shift());
      }
    } else {
      fetchErrors(values);
    }
  };

  return (
    <>
      <Text style={{ fontSize: "2em" }}>异常分析</Text>
      <PanelFilter items={items} onSubmit={onSubmit} />

      <Table
        columns={columns}
        dataSource={data}
        rowKey="key"
        bordered
        scroll={{ x: true }}
        locale={{
          emptyText: (
            <Empty
              style={{ width: "100%" }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
      />
    </>
  );
};

export default Exception;

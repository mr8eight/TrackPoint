import { Button, Table, Typography, Empty, message } from "antd";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { PanelFilter, SelectFilter, DateFilter } from "@/commons/Filter";
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
    message.success("报警通知已发送");
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

const items: PanelFilterItems[] = [
  {
    label: "日期选择：",
    name: "date",
    item: <DateFilter />,
  },
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
  const [data, setData] = useState<DataType[]>();
  const [reqData, setReqData] = useState<Record<string, any>>({
    current: 1,
    pageSize: 10,
  });

  const fetchErrors = async (params: any) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/tracking/errorMonitor",
        params,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(data.data.list);
      message.success(data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("查询失败，请稍后重试");
    }
  };

  const handleTableChange = async (pag: any) => {
    setReqData({
      ...reqData,
      page: pag.current,
      pageSize: pag.pageSize,
    });
    await fetchErrors(reqData);
  };

  const onSubmit = async (values: any) => {
    const msg = [];
    if (!values?.date) {
      msg.push("请选择日期！");
    }
    if (!values?.urls) {
      msg.push("请选择url！");
    }
    if (!values?.types) {
      msg.push("请选择异常类型！");
    }

    // 无论是否通过验证都更新 filters 状态
    setReqData({
      ...reqData,
      ...msg,
    });
    await fetchErrors(reqData);
    if (msg.length > 0) {
      // 使用延时确保消息顺序显示
      msg.forEach((messageText, index) => {
        setTimeout(() => message.error(messageText), index * 100);
      });
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
        pagination={{
          current: reqData.page,
          pageSize: reqData.pageSize,
        }}
        onChange={handleTableChange}
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

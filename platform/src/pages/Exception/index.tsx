import { Button, Table, Typography, Empty, message } from "antd";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { DateFilter, PanelFilter, SelectFilter } from "@/commons/Filter";
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
    // axios
    //   .post("/api/send-alert", { errorKey: record.key })
    //   .then(() => {
    //     message.success("报警通知已发送");
    //   })
    //   .catch(() => {
    //     message.error("报警通知发送失败");
    //   });
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

// const initialData: DataType[] = [
//   {
//     key: "1",
//     url: "http://example.com",
//     type: "JS Error",
//     time: "2025-02-23 10:00:00",
//     message: "Uncaught TypeError in app.js",
//   },
//   {
//     key: "2",
//     url: "http://example.com",
//     type: "API Error",
//     time: "2025-02-23 10:05:00",
//     message: "500 Internal Server Error",
//   },
//   {
//     key: "3",
//     url: "http://example.com/assets",
//     type: "Resource Error",
//     time: "2025-02-23 10:10:00",
//     message: "404 Not Found",
//   },
// ];

const items: PanelFilterItems[] = [
  {
    label: "日期选择：",
    name: "date",
    item: <DateFilter />,
  },
  {
    label: "url选择：",
    name: "urls",
    item: (
      <SelectFilter
        options={[
          { label: "首页", value: "/home" }, // 首页
          { label: "登录页", value: "/login" }, // 登录页
          { label: "注册页", value: "/register" }, // 注册页
          { label: "商品页", value: "/product" }, // 商品页
          { label: "商品详情页", value: "/product/" }, // 商品详情页
        ]}
      />
    ),
  },
  {
    label: "异常类型选择：",
    name: "types",
    item: (
      <SelectFilter
        options={[
          { label: "js错误", value: "js错误" },
          { label: "promise错误", value: "promise错误" },
          { label: "资源加载错误", value: "资源加载错误" },
          { label: "手动捕获错误", value: "手动捕获错误" },
          { label: "接口请求超时", value: "接口请求超时" },
          { label: "接口错误", value: "接口错误" },
        ]}
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

const Exception = () => {
  const [data, setData] = useState<DataType[]>();
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [filters, setFilters] = useState<Record<string, any>>({});

  useEffect(() => {
    // 精确判断有效过滤条件（urls 和 types 必须同时存在）
    if (filters?.urls?.length > 0 && filters?.types?.length > 0) {
      console.log(filters);
      fetchErrors(filters);
    } else {
      // 清空数据（可选，根据业务需求）测试setData([initialData])
      setData([]);
    }
  }, [filters, pagination]);

  const fetchErrors = async (params: any) => {
    try {
      const requestParams = {
        urls: params.urls,
        types: params.types,
        startTime: params.date?.startTime || "2025-02-15 00:00:00",
        endTime: params.date?.endTime || "2025-02-15 23:59:59",
        page: pagination.current,
        pageSize: pagination.pageSize,
      };
      const { data } = await axios.post(
        "http://localhost:3000/tracking/errorMonitor",
        requestParams,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(data.data.list);
      setTotal(data.data.total);
      message.success(data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("查询失败，请稍后重试");
    }
  };

  const handleTableChange = (pag: any) => {
    setPagination({
      current: pag.current,
      pageSize: pag.pageSize,
    });
  };

  const onSubmit = (values: any) => {
    const msg = [];
    if (!values?.urls) {
      msg.push("请选择url！");
    }
    if (!values?.types) {
      msg.push("请选择异常类型！");
    }

    // 无论是否通过验证都更新 filters 状态
    setFilters(values);

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
          current: pagination.current,
          pageSize: pagination.pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total) => `共 ${total} 条`,
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

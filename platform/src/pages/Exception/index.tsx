import { Button, Input, Select, Table, Space, Row, Col, message } from 'antd';
import type { TableProps } from 'antd';
import { useState } from 'react';

interface DataType {
  key: string;
  url?: string;
  type?: string;
  time?: string;
  message: string;
}

const AlertButton = ({ record }: { record: DataType }) => {
  const handleAlert = () => {
    fetch('/api/send-alert', {
      method: 'POST',
      body: JSON.stringify({ errorKey: record.key })
    }).then(() => {
      message.success('报警通知已发送');
    }).catch(() => {
      message.error('报警通知发送失败');
    });
  };

  return <Button onClick={handleAlert}>报警</Button>;
};

const columns: TableProps<DataType>["columns"] = [
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: any, record: DataType) => <AlertButton record={record} />,
  },
];

const initialData: DataType[] = [
  { key: '1', url: 'http://example.com', type: 'JS Error', time: '2025-02-23 10:00:00', message: 'Uncaught TypeError in app.js' },
  { key: '2', url: 'http://example.com', type: 'API Error', time: '2025-02-23 10:05:00', message: '500 Internal Server Error' },
  { key: '3', url: 'http://example.com/assets', type: 'Resource Error', time: '2025-02-23 10:10:00', message: '404 Not Found' },
];

const Exception = () => {
  const [urlFilter, setUrlFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [data, setData] = useState<DataType[]>(initialData);

  const fetchErrors = async (params: any) => {
    try {
      const response = await fetch('/api/get-errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const result = await response.json();
      setData(result);
      message.success('查询成功！');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleUrlChange = debounce((value: string) => {
    setUrlFilter(value);
    fetchErrors({ url: value, type: typeFilter });
  }, 700);
  
  const handleTypeChange = debounce((value: string) => {
    setTypeFilter(value);
    fetchErrors({ url: urlFilter, type: value });
  }, 700);

  return (
    <>
      <h1>异常分析</h1>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder="Filter by URL"
            allowClear
            onChange={(e) => handleUrlChange(e.target.value)}
          />
        </Col>
        <Col span={8}>
          <Select
            placeholder="Filter by Type"
            allowClear
            style={{ width: '100%' }}
            onChange={(value) => handleTypeChange(value)}
            options={[
              { value: 'JS Error', label: 'JS Error' },
              { value: 'API Error', label: 'API Error' },
              { value: 'Resource Error', label: 'Resource Error' }
            ]}
          />
        </Col>
      </Row>
      
      <Table
        columns={columns}
        dataSource={data}
        rowKey="key"
        bordered
        scroll={{ x: true }}
        locale={{ emptyText: '暂无数据' }}
      />
    </>
  );
};

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: any;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default Exception;
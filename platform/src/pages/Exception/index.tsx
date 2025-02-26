import { Button, Input, Select, Table, Space, Row, Col } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';

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
      alert('报警通知已发送');
    });
  };

  return <Button onClick={handleAlert}>报警</Button>;
};

const columns: TableProps<DataType>["columns"] = [
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

// 添加几个初始数据项
const initialData: DataType[] = [
  { key: '1', url: 'http://example.com', type: 'JS Error', time: '2025-02-23 10:00:00', message: 'Uncaught TypeError in app.js' },
  { key: '2', url: 'http://example.com', type: 'API Error', time: '2025-02-23 10:05:00', message: '500 Internal Server Error' },
  { key: '3', url: 'http://example.com/assets', type: 'Resource Error', time: '2025-02-23 10:10:00', message: '404 Not Found' },
];

const Exception = () => {
  const [urlFilter, setUrlFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [data, setData] = useState<DataType[]>(initialData);

  const debouncedFetch = debounce(async (params: any) => {
    try {
      const response = await fetch('/api/get-errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, 300);

  useEffect(() => {
    const filters: any = {};
    if (urlFilter) filters.url = urlFilter;
    if (typeFilter) filters.type = typeFilter;
    
    debouncedFetch(filters);
  }, [urlFilter, typeFilter]);

  return (
    <>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder="Filter by URL"
            allowClear
            onChange={(e) => setUrlFilter(e.target.value)}
          />
        </Col>
        <Col span={8}>
          <Select
            placeholder="Filter by Type"
            allowClear
            style={{ width: '100%' }}
            onChange={setTypeFilter}
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
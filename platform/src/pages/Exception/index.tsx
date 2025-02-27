import { Button, Input, Select, Table, Row, Col, message } from 'antd';
import type { TableProps } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

interface DataType {
  key: string;
  url?: string;
  type?: string;
  time?: string;
  message: string;
}

const AlertButton = ({ record }: { record: DataType }) => {
  const handleAlert = () => {
    axios.post('/api/send-alert', { errorKey: record.key })
      .then(() => {
        message.success('报警通知已发送');
      })
      .catch(() => {
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

  useEffect(() => {
    // 创建 axios-mock-adapter 实例并设置延时（可选）
    const mock = new MockAdapter(axios, { delayResponse: 300 });

    // 模拟 /api/get-errors 接口
    mock.onPost('/api/get-errors').reply(config => {
      const params = JSON.parse(config.data);
      return [
        200,
        {
          body: initialData.filter(item =>
            (!params.url || item.url.includes(params.url)) &&
            (!params.type || item.type === params.type)
          )
        }
      ];
    });

    // 模拟 /api/send-alert 接口
    mock.onPost('/api/send-alert').reply(200);

    return () => {
      mock.restore();
    };
  }, []);

  const fetchErrors = async (params: any) => {
    try {
      const { data } = await axios.post('/api/get-errors', params, {
        headers: { 'Content-Type': 'application/json' }
      });
      setData(data.body);
      message.success('查询成功！');
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('查询失败，请稍后重试');
    }
  };
  
  const handleUrlChange = debounce((value: string) => {
    setUrlFilter(value);
    fetchErrors({ url: value, type: typeFilter });
  }, 500);
  
  const handleTypeChange = debounce((value: string) => {
    setTypeFilter(value);
    fetchErrors({ url: urlFilter, type: value });
  }, 500);

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
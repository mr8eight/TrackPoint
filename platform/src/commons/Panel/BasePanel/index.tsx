import { List, Space, Typography } from "antd";
import type { BasePanelProps } from "@/commons/Panel";

const { Title } = Typography;

const BasePanel: React.FC<BasePanelProps> = ({
  headerIcon,
  headerText,
  items,
}) => {
  return (
    <List
      header={
        <Title level={4}>
          <Space>
            {headerIcon}
            {headerText}
          </Space>
        </Title>
      }
      bordered
    >
      {items.map((item, index) => (
        <List.Item key={index}>{item}</List.Item>
      ))}
    </List>
  );
};

export default BasePanel;

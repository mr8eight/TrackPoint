import React from "react";
import { List, Space, Typography } from "antd";
import type { BasePanelProps } from "@/commons/Panel";

const { Title } = Typography;

const Item: React.FC<React.ComponentProps<typeof List.Item>> = (props) => (
  <List.Item {...props} />
);

const BasePanel: React.FC<BasePanelProps> & {
  Item: typeof Item;
} = ({ headerIcon, headerText, items, children }) => {
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
      {items
        ? items.map((item, index) => <List.Item key={index}>{item}</List.Item>)
        : children}
    </List>
  );
};

BasePanel.Item = Item;

export default BasePanel;

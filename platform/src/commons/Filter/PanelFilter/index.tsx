import React, { useState } from "react";
import { Col, Row, Typography } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { BasePanel } from "@/commons/Panel";
import type { PanelFilterProps } from "@/commons/Filter";

const { Text } = Typography;

const PanelFilter: React.FC<PanelFilterProps> = ({ items, onSubmit }) => {
  const [values, setValues] = useState();

  const onPanelSubmit = () => {
    onSubmit(values);
  };

  const panelItems = items.map(({ label, name, item, button }) => (
    <Row style={{ width: "100%" }} align="middle">
      <Col span={6} push={3}>
        <Text>{label}</Text>
      </Col>
      {button ? (
        <>
          <Col span={12} push={1}>
            {React.cloneElement(
              item,
              Object.assign({}, item.props, {
                value: undefined,
                onChange: (value) => {
                  setValues(Object.assign({}, values, { [name]: value }));
                },
              })
            )}
          </Col>
          <Col span={6} push={1}>
            {button.type === "submit"
              ? React.cloneElement(
                  button.item,
                  Object.assign({}, button.item.props, {
                    onClick: onPanelSubmit,
                  })
                )
              : button.item}
          </Col>
        </>
      ) : (
        <Col span={18} push={1}>
          {React.cloneElement(
            item,
            Object.assign({}, item.props, {
              value: undefined,
              onChange: (value) => {
                setValues(Object.assign({}, values, { [name]: value }));
              },
            })
          )}
        </Col>
      )}
    </Row>
  ));
  return (
    <BasePanel
      headerText="筛选条件"
      headerIcon={<FilterOutlined />}
      items={panelItems}
    />
  );
};

export default PanelFilter;

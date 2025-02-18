import React, { useState } from "react";
import { Col, Flex, Row, Typography, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import type { PanelFilterProps } from "@/commons/Filter";

const { Title, Text } = Typography;

const PanelFilter: React.FC<PanelFilterProps> = ({ items, onSubmit }) => {
  const [values, setValues] = useState();

  const onPanelSubmit = () => {
    onSubmit(values);
  };

  return (
    <Flex vertical className={styles["wrapper"]}>
      <Flex className={styles["titleBar"]}>
        <Title level={4} style={{ marginBottom: "0" }}>
          <Space>
            <FilterOutlined />
            筛选条件
          </Space>
        </Title>
      </Flex>
      {items.map(({ label, name, item, button }, index) => {
        return (
          <Row
            align="middle"
            justify="space-between"
            className={styles["paragraph"]}
            key={index}
          >
            <Col span={6} push={3}>
              <Text>{label}</Text>
            </Col>
            {button ? (
              <>
                <Col span={12}>
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
                <Col span={6}>
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
              <Col span={18}>
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
        );
      })}
    </Flex>
  );
};

export default PanelFilter;

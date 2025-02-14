import { Layout, Typography, Menu } from "antd";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { useState } from "react";
import { MenuItem } from "@/types";
import useStore from "@/store";

const { Header } = Layout;
const { Title } = Typography;

const items: MenuItem[] = [
  {
    label: "行为监控",
    key: "action",
    children: [
      { key: "event", label: <Link to="/action/event">事件分析</Link> },
      { key: "retention", label: <Link to="/action/retention">留存分析</Link> },
    ],
  },
  {
    label: <Link to="/performance">性能监控</Link>,
    key: "performance",
  },
  {
    label: <Link to="/exception">异常监控</Link>,
    key: "exception",
  },
];

const HeaderBar: React.FC = () => {
  const headerMenuCur = useStore((state) => state.headerMenuCur);
  const setHeaderMenuCur = useStore((state) => state.setHeaderMenuCur);

  return (
    <Header className={styles["header"]}>
      <Link
        className={styles["logo"]}
        to="/"
        onClick={() => {
          setHeaderMenuCur("");
        }}
      >
        <img className={styles["logo-image"]} src="/favicon.ico" alt="logo" />
        <Title level={3} style={{ marginBottom: 0 }}>
          TrackPoint
        </Title>
      </Link>
      <Menu
        selectedKeys={[headerMenuCur]}
        mode="horizontal"
        items={items}
        style={{ marginLeft: "4em" }}
        onClick={(e) => {
          console.log(e.key);
          setHeaderMenuCur(e.key);
        }}
      />
    </Header>
  );
};

export default HeaderBar;

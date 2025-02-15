import { Layout, Typography, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { MenuItem } from "@/types";

const { Header } = Layout;
const { Title } = Typography;

const eventPath = "/action/event";
const retentionPath = "/action/retention";
const performancePath = "/performance";
const exceptionPath = "/exception";

type MenuKey =
  | "action"
  | "event"
  | "retention"
  | "performance"
  | "exception"
  | "";

const map: Record<string, MenuKey> = {
  [eventPath]: "event",
  [retentionPath]: "retention",
  [performancePath]: "performance",
  [exceptionPath]: "exception",
};

const items: MenuItem[] = [
  {
    key: "action",
    label: "行为监控",
    children: [
      { key: map[eventPath], label: <Link to={eventPath}>事件分析</Link> },
      {
        key: map[retentionPath],
        label: <Link to={retentionPath}>留存分析</Link>,
      },
    ],
  },
  {
    key: map[performancePath],
    label: <Link to={performancePath}>性能监控</Link>,
  },
  { key: map[exceptionPath], label: <Link to={exceptionPath}>异常监控</Link> },
];

const HeaderBar: React.FC = () => {
  const [current, setCurrent] = useState<MenuKey>("");
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;
    switch (pathName) {
      case eventPath: {
        setCurrent(map[eventPath]);
        break;
      }
      case retentionPath: {
        setCurrent(map[retentionPath]);
        break;
      }
      case performancePath: {
        setCurrent(map[performancePath]);
        break;
      }
      case exceptionPath: {
        setCurrent(map[exceptionPath]);
        break;
      }
      default: {
        setCurrent("");
      }
    }
  }, [location.pathname]);

  return (
    <Header className={styles["header"]}>
      <Link className={styles["logo"]} to="/">
        <img className={styles["logo-image"]} src="/favicon.ico" alt="logo" />
        <Title level={3} style={{ marginBottom: 0 }}>
          TrackPoint
        </Title>
      </Link>
      <Menu
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{ marginLeft: "4em" }}
      />
    </Header>
  );
};

export default HeaderBar;

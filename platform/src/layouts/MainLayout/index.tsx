import { Layout } from "antd";
import { HeaderBar, FooterBar } from "./components";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderBar />
      <Content style={{ padding: "2.5em 5em" }}>
        <Outlet />
      </Content>
      <FooterBar />
    </Layout>
  );
};

export default MainLayout;

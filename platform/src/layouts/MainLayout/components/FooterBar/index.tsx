import { Layout, Space, Typography } from "antd";
import { GithubFilled } from "@ant-design/icons";

const { Footer } = Layout;
const { Link } = Typography;

const FooterBar: React.FC = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
        borderTop: "1px solid rgba(0, 21, 64, 0.16)",
        zIndex: 2,
      }}
    >
      <Link href="https://github.com/mr8eight/TrackPoint" target="_blank">
        <Space>
          Follow Me
          <GithubFilled />
        </Space>
      </Link>
    </Footer>
  );
};

export default FooterBar;

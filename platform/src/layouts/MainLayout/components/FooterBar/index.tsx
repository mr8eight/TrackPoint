import { Layout, Space, Typography } from "antd";
import { GithubFilled } from "@ant-design/icons";
import styles from "../index.module.scss";

const { Footer } = Layout;
const { Link } = Typography;

const FooterBar: React.FC = () => {
  return (
    <Footer className={styles["footer"]}>
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

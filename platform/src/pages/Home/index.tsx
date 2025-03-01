import { Button, Flex, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { GithubFilled } from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <img
        style={{ height: "15em", marginBottom: "1em" }}
        src="/favicon.ico"
        alt="logo"
      ></img>
      <Title className={styles.title}>TrackPoint Platform</Title>
      <Paragraph>帮助团队打造一个优质软件产品</Paragraph>
      <Flex gap={"1em"}>
        <Button>
          <Link
            to="https://github.com/mr8eight/TrackPoint"
            target="_blank"
            rel="noopener"
          >
            <Space>
              Github
              <GithubFilled />
            </Space>
          </Link>
        </Button>
        <Button type="primary">
          <Link to="/action">立即开始</Link>
        </Button>
      </Flex>
    </div>
  );
};

export default Home;

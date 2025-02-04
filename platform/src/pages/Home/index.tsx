import { Button } from "antd";
import Line from "@/commons/line";
import styles from "@/pages/Home/index.module.scss";

const Home: React.FC = () => (
  <div className={styles.home}>
    <Line />
    <Button type="primary" onClick={() => console.log("yes")}>
      Button
    </Button>
  </div>
);

export default Home;

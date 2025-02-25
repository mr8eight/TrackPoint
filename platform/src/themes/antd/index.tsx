import type { ThemeConfig } from "antd";
import { MAIN_COLOR } from "@/global";

function mainBg(bgColor: string = "#ffffff") {
  return {
    headerBg: bgColor,
    bodyBg: bgColor,
    siderBg: bgColor,
  };
}

const themeStyle: ThemeConfig = {
  token: {
    colorPrimary: MAIN_COLOR,
  },
  components: {
    Layout: {
      ...mainBg(),
    },
  },
};

export default themeStyle;

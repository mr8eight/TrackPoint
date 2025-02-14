import type { ThemeConfig } from "antd";

const MAIN_COLOR = "#F79843";
const WHITE = "#ffffff";
const WHITE_GREY = "#f5f5f5";

function mainBg(bgColor: string) {
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
      ...mainBg(WHITE),
    },
  },
};

export { MAIN_COLOR };
export default themeStyle;

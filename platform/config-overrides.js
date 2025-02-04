const path = require("path");
const { override, addWebpackAlias } = require("customize-cra");
const rootPath = path.resolve(__dirname, "src");

module.exports = {
  // 修改开发或生产编译 react 应用程序时使用的 Webpack 配置
  webpack: override(
    // 添加别名配置
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
    })
  ),
};

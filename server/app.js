var createError = require("http-errors");
const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var eventsRouter = require("./routes/events");
const trackingRoutes = require("./routes/trackingRoutes");
const eventAttributeRoutes = require("./routes/eventAttribute");

var app = express();

// 视图引擎设置
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// 使用 CORS 中间件
// // 启用 CORS
// app.use(cors({
//   origin: 'http://localhost:3001', // 允许的源
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的 HTTP 方法
//   allowedHeaders: ['Content-Type', 'Authorization'] // 允许的请求头
// }));
const allowedOrigins = ["http://localhost:3001", "http://localhost:3002"]; // 替换为实际前端地址
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);
app.options("*", cors()); // 显式处理 OPTIONS
// 前置中间件
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 路由中间件
// 使用埋点路由
app.use("/tracking", trackingRoutes);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use("/eventAttribute", eventAttributeRoutes);

// 后置中间件，捕获404错误
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理中间件
app.use(function (err, req, res, next) {
  // 设置本地变量，仅在开发环境下包含错误信息
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // 渲染错误页面
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

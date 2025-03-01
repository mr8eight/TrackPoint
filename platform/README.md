# TrackPoint Platform

## 项目简介

TrackPoint Platform 是一个将埋点SDK上报数据可视化的平台，它提供了三个模块：行为分析、性能分析和异常分析。每个模块包含筛选面板和数据看板，平台用户可以通过筛选面板自由选择条件，以分析经数据服务统计处理后的埋点数据。

## 项目内容

### 行为分析

分析用户在指定时间内的行为动向。

#### 筛选面板

包含所有行为，开始时间和结束时间（开始时间 <= 可选时间 <= 结束时间）。

##### 选项格式样本

```
const data = {
    // 时间范围
    date: {
        startTime: "2025-01-01 00:00:00",
        endTime: "2025-02-01 00:00:00",
    },
    // 行为范围
    actionOptions: [
      {
        label: "点击行为",
        value: "点击行为",
        children: [
          {
            label: "点击注册按钮",
            value: "点击注册按钮",
          },
          {
            label: "点击登录按钮",
            value: "点击登录按钮",
          },
        ],
      },
      {
        label: "浏览行为",
        value: "浏览行为",
        children: [
          {
            label: "浏览注册页面",
            value: "浏览注册页面",
          },
          {
            label: "浏览登录页面",
            value: "浏览登录页面",
          },
        ],
      },
    ],
    ruleOptions: [
    {
        value: "总次数（含重复用户）",
        label: "总次数（含重复用户）",
    },
    {
        value: "去重次数（独立用户）",
        label: "去重次数（独立用户）",
    },
    ]
};
```

#### 数据看板

单选日期和规则，多选行为。响应相关行为在指定时间的发生次数和行为名称。

##### 请求内容格式样本

```
const reqData = {
    date: {
        showType: "hour", // "hour" | "day"
        startTime: "2025-02-06",
        endTime: "2025-02-06",
    },
    rule: "unique", // "unique" | "total"
    actions: [["点击行为", "点击注册按钮"], ["浏览行为", "浏览登录页面"]],
};
```

##### 响应内容格式样本

```
const resData = {
    actions: [{
        label: "点击注册按钮",
        data: [150, 230, ... , 260],
    }, {
        label: "浏览登录页面",
        data: [150, 230, ... , 260],
    },]
};
```

### 性能分析

分析页面在指定时间内的性能指标。

#### 筛选面板

包含所有url，开始时间和结束时间（开始时间 <= 可选时间 <= 结束时间）。

##### 选项格式样本

```
const data = {
    // 时间范围
    date: {
        startTime: "2025-01-01 00:00:00",
        endTime: "2025-02-01 00:00:00",
    },
    // url范围
    urlOptions: [
        {
            label: "https://domain0.com",
            value: "https://domain0.com",
        }, {
            label: "https://domain1.com",
            value: "https://domain1.com",
        },
    ],
};
```

#### 数据看板

单选url和时间。响应指定页面在指定时间的所有性能指标的平均值和最大值。

##### 请求内容格式样本

```
const reqData = {
    date: {
        showType: "day",
        startTime: "2025-02-01",
        endTime: "2025-02-28"
    },
    url: "https://domain0.com",
};
```

##### 响应内容格式样本

```
const resData = {
  metrics: {
    FP: {             // 首次绘制时间
      avg: [1700, 1800, ..., 1600],
      max: [1700, 1800, ..., 1600],
    },
    FCP: {              // 首次内容渲染时间
      avg: [1700, 1800, ..., 1600],
      max: [1700, 1800, ..., 1600],
    },
    LCP: {              // 最大内容渲染时间
      avg: [1700, 1800, ..., 1600],
      max: [1700, 1800, ..., 1600],
    },
    CLS: {              // 布局偏移量
      avg: [0.1, 0.2, ..., 0.05],   // 平均值（分数）
      max: [0.1, 0.2, ..., 0.05],
    },
  },
};
```

### 异常分析

分析页面在指定时间内发生异常的类型。

#### 筛选面板

包含所有发生异常页面的url和异常类型。

##### 选项格式样本

```
const data = {
    // url范围
    urlOptions: [
        {
            label: "https://domain0.com",
            value: "https://domain0.com",
        }, {
            label: "https://domain1.com",
            value: "https://domain1.com",
        },
    ],
    // 异常类型范围
    typeOptions: [
        {
            label: "JS Error",
            value: "JS Error",
        }, {
            label: "Resource Error",
            value: "Resource Error",
        },
    ],
};
```

#### 数据看板

多选发生异常页面的url和异常类型。响应相关数据。

##### 请求内容格式样本

```
const reqData = {
    urls: ["https://domain0.com", "https://domain1.com"],
    types: ["JS Error", "Resource Error"],
};
```

##### 响应内容格式样本

```
const resData = {
    exceptions: [
      {
        key: "page_id",
        url: "https://domain0.com",
        type: "JS Error",
        time: "2025-02-23 10:00:00",
        message:
          "Uncaught TypeError: Cannot read properties of undefined (reading 'a') at index.html:90:29",
      }, {
        key: "page_id",
        url: "https://domain1.com",
        type: "JS Error",
        time: "2025-02-23 10:00:00",
        message:
          "Uncaught TypeError: Cannot read properties of undefined (reading 'a') at index.html:90:29",
      },],
};
```

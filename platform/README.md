# TrackPoint Platform

## 项目简介

TrackPoint Platform 是一个将埋点SDK上报数据可视化的平台，它提供了三个模块：行为分析、性能分析和异常分析。每个模块包含筛选面板和数据看板，平台用户可以通过筛选面板自由选择条件，以分析经数据服务统计处理后的埋点数据。

## 项目启动

```
pnpm install
pnpm start
```

## 技术栈

1. React + TypeScript + Scss：基本搭建。
2. React Router：React路由库，实现路由和导航功能。
3. Antd：React组件库，构建布局和筛选面板模块。
4. Echarts + Echarts for React：适用于React的Echarts图表库，构建数据看板模块。
5. Axios + Axios Mock Adapter：请求库，模拟服务端响应。
6. dayjs：处理时间格式。

## 目录结构

```
platform
│  config-overrides.js            // 重写webpack文件
│  package.json                   // 依赖项
│  README.md                      // 说明文档
│  tsconfig.json                  // ts配置文件
└─src
    │  data.tsx                   // 筛选面板的选项数据
    │  global.scss                // 全局scss文件
    │  global.ts                  // 全局ts文件
    │  index.tsx                  // 入口文件
    │  routes.tsx                 // 路由文件
    ├─commons                     // 通用文件夹
    │  ├─Filter                   // 筛选面板组件
    │  │  ├─CascaderFilter        // 级联选择器
    │  │  ├─DateFilter            // 日期选择器
    │  │  ├─PanelFilter           // 筛选面板
    │  │  ├─RadioFilter           // 单选框
    │  │  └─SelectFilter          // 下拉框
    │  ├─function                 // 通用函数
    │  └─Panel
    │      └─BasePanel
    ├─layouts
    │  └─MainLayout               // 整体布局
    ├─pages
    │  ├─Action                   // 行为监控页面
    │  ├─Exception                // 异常监控页面
    │  ├─Home                     // 主页面
    │  └─Performance              // 性能监控页面
    └─themes
        └─antd                    // Antd主题配置文件
```

## 项目内容

### 行为分析

分析用户在指定时间内的行为动向，即统计指定用户在指定时间段内发生指定行为的次数。

#### 筛选面板

##### 日期选择器

在可控范围内，按天筛选 or 按月筛选。

- 日期范围按天筛选，可视化看板按小时展示。
- 日期范围按月筛选，可视化看板按天展示。

##### 行为选择器

在可控范围内，单选。

#### 数据看板

- x轴为时间，y轴为发生次数。
- 响应相关行为在指定时间内的发生次数和行为名称。

### 性能分析

分析指定 URL 在指定时间段内的性能指标数据，帮助开发者了解网站的加载速度和用户体验。性能指标包括首次绘制时间（FP）、首次内容绘制时间（FCP）、最大内容绘制时间（LCP）、累积布局偏移（CLS）。

#### 筛选面板

##### 日期选择器

在可控范围内，按天筛选 or 按月筛选。

- 日期范围按天筛选，可视化看板按小时展示。
- 日期范围按月筛选，可视化看板按天展示。

##### URL选择器

在可控范围内，单选。

#### 数据看板

- 简略模式（柱状图）：显示FP、FCP、LCP、CLS的平均值；详细模式（折线图）：显示FP、FCP、LCP、CLS的平均值和最大值随时间的变化趋势。
- 响应相关 URL 在指定时间内的性能指标数据，以折线图或柱状图形式展示不同时间点的性能趋势，并提供平均值和最大值统计数据。

### 异常分析

分析发生异常页面的url和类型。

#### 筛选面板

##### URL选择器

在可控范围内，多选。

##### 异常类型选择器

在可控范围内，多选。

#### 数据看板

以表格形式呈现，最后一列为操作，里面包含报警按钮，点击后，可以向开发人员或测试人员发送邮件。

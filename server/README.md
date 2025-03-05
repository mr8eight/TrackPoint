# Server 项目说明

## 项目概述
本项目是一个埋点数据收集与分析的后端服务，基于 Node.js 和 Express 框架开发，使用 MySQL 作为数据库，Sequelize 作为 ORM 工具。

## 技术栈
- **Node.js**: 后端运行时环境
- **Express**: Web 框架
- **MySQL**: 数据库
- **Sequelize**: ORM 工具
- **Jade**: 模板引擎

## 项目结构
```plaintext
server/
├── bin/                # 启动脚本
├── config/             # 配置文件
├── controllers/        # 控制器
├── models/             # 数据模型
├── repositories/       # 数据访问层
├── routes/             # 路由
├── schema/             # 数据库初始化脚本
├── views/              # 视图模板
├── public/             # 静态资源
├── app.js              # 应用入口文件
└── package.json        # 项目依赖
```

## 快速开始

### 1. 安装依赖
```bash
npm install
```
### 2. 配置数据库
在 `config/config.js` 文件中配置数据库连接信息。

### 3. 初始化数据库
使用Navicat等数据工具，按下列文件的顺序运行sql 脚本，初始化数据库。数据库初始化脚本位于 `schema/` 目录下。
+ schema.sql
+ indexes.sql
+ init_events_table.sql
+ init_data.sql
+ visual_data.sql

### 4. 启动服务
服务默认运行在 http://localhost:5000
```bash
npm start
```

## API 文档
### 埋点数据接口
POST /tracking  
    trackingController.createTracking  
    埋点数据上报

POST /tracking/eventStats  
    actionController.getEventStats  
    获取行为分析统计数据

POST /tracking/performance  
    performanceController.getPerformanceData  
    获取性能分析统计数据

POST /tracking/errorMonitor  
    errorMonitorController.getErrorMonitorData  
    获取错误监控数据

## 数据库设计
主要表结构  
events: 事件表  
event_attributes: 事件属性表  
tracking_data: 埋点数据表  
tracking_attributes: 埋点属性数据表  

详细表结构请参考 schema/schema.sql。

## 开发指南
### 添加新路由
在 `routes/` 目录下添加新的路由文件，在 `app.js` 中引入并注册路由
### 添加新控制器
在 `controllers/` 目录下添加新的控制器文件，在路由文件中引入并使用控制器

在控制器代码中，采用Repository设计模式：将数据库操作抽象到单独的Repository层，实现数据访问与业务逻辑的解耦。  

这样组织项目结构的好处是：  
清晰的职责分离：将数据访问逻辑与业务逻辑分离  
更好的可维护性：所有Repository类集中在一个目录下  
易于扩展：新增Repository时可以直接放在这个目录下  
符合MVC模式：Repository层作为Model层的一部分  

### 添加新模型
在 `models/` 目录下创建新模型文件，使用 Sequelize 定义模型结构

## 注意事项

1. sql文件运行顺序

先运行init_data.sql，这个是一些基础数据；  
再运行visual_data.sql，这个是初始化可视化数据

2. 时间转换

因为数据库中的时间存储和读取时可能涉及时区转换问题，所以在代码中需要进行时区转换

原因分析：数据库时区设置。数据库可能使用了 UTC 时区存储时间，而你的本地时区是东八区（UTC+8）。
例如，2025-02-15 10:05:22 在 UTC 时区下存储为 2025-02-15 02:05:22，读取时根据本地时区转换后显示为 2025-02-15 10:05:22。  

解决方案：检查数据库时区
确保数据库的时区设置正确。可以通过以下 SQL 查询当前时区：
```
SELECT @@global.time_zone, @@session.time_zone;
```
如果时区不是 +08:00，可以通过以下命令修改：
```
SET GLOBAL time_zone = '+08:00';
SET SESSION time_zone = '+08:00';
```
3. 关于表结构的设计和举例

| 特性 | 事件（Event） | 埋点（Tracking） | 
|----------|--------------------------|-----------------------------|
 | 性质 | 预定义的业务动作 | 事件发生的具体实例 | 
 | 数据特点 | 相对静态，定义后不常改变 | 动态变化，每次发生都会产生新的记录 | 
 | 存储内容 | 事件的基本信息和属性定义 | 事件发生的上下文信息和具体数据 | 
 | 使用场景 | 用于定义需要追踪的业务动作 | 用于记录和分析用户行为 | 
 | 数据量 | 数量较少，与业务动作数量相关 | 数量庞大，与用户行为频率相关 | 
 | 示例 | 定义"登录"、"注册"、"购买"等事件 | 记录用户A在14:00登录，用户B在15:00购买商品等 |

场景：一个电商网站的"加入购物车"功能

事件（Event）：
定义：这是一个预定义的业务动作，在系统中需要被追踪
例子：在系统中定义"add_to_cart"事件
属性：
事件名称：add_to_cart
描述：用户将商品加入购物车
状态：启用
创建时间：2023-01-01
更新时间：2023-01-01

埋点（Tracking）：
定义：这是事件发生的具体实例，包含实际发生时的详细数据
例子：用户A将商品B加入购物车
数据：
事件ID：add_to_cart事件的ID
用户ID：user_123
设备ID：device_456
商品ID：product_789
加入时间：2023-10-01 14:30:00
商品价格：99.99
商品数量：2


| 参数名 | 值示例 | 说明 |
 |--------------|--------------------|-----------------------------------------| 
 | event_id | 123 | 事件ID，对应"加入购物车"事件的ID |
 | user_id | "user_123" | 用户唯一标识 | 
 | event_time | "2023-10-01 14:30:00" | 事件发生时间 | 
 | attributes | 数组 | 事件附加属性列表 | 
 | - attribute_id | 1 | 属性ID，对应事件定义时设置的属性ID | 
 | - attribute_value | "product_789" | 属性值，根据属性类型可以是字符串、数字等 |

数据库存储结果：  
tracking_data 表
| id | event_id | user_id | event_time | 
|-----|----------|------------|---------------------| 
| 1 | 123 | user_123 | 2023-10-01 14:30:00 |

tracking_attributes 表：  
| id | tracking_id | attribute_id | attribute_value |
|-----|-------------|--------------|-----------------| 
| 1 | 1 | 1 | product_789 | 
| 2 | 1 | 2 | 99.99 | 
| 3 | 1 | 3 | 2 |

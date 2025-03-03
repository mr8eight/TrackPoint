-- 删除表（如果存在）

-- 事件表（存储埋点事件基本信息）
DROP TABLE IF EXISTS events;
CREATE TABLE events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,  -- 事件ID
    event_key VARCHAR(255) NOT NULL,       -- 事件key
    event_name VARCHAR(255) NOT NULL,      -- 事件名称
    status TINYINT DEFAULT 1,              -- 事件状态（1:启用, 0:禁用）
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- 更新时间
);

-- 事件属性表（存储事件的扩展属性）
DROP TABLE IF EXISTS event_attributes;
CREATE TABLE event_attributes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT NOT NULL,              -- 关联的事件ID
    attribute_key VARCHAR(255) NOT NULL,   -- 属性key
    attribute_name VARCHAR(255) NOT NULL,  -- 属性名
    attribute_type VARCHAR(50) NOT NULL,   -- 属性类型（string, number, boolean等）
    is_required TINYINT DEFAULT 0,         -- 是否必填（1:是, 0:否）
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- 埋点数据表（存储实际的上报数据）
DROP TABLE IF EXISTS tracking_data;
CREATE TABLE tracking_data (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT NOT NULL,              -- 关联的事件ID
    user_id VARCHAR(255),                  -- 用户ID
    user_agent  VARCHAR(255) NOT NULL,     -- 客户端信息
    app_id VARCHAR(255),                   -- 应用ID
    app_version VARCHAR(50),               -- 应用版本
    app_type VARCHAR(50) NOT NULL,         -- 客户端类型（desktop,web,h5,wechat_mini_program,alipay_mini_program,ios_app,android_app）
    current_url VARCHAR(255) NOT NULL,               -- 当前URL
    event_time DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 事件发生时间
    FOREIGN KEY (event_id) REFERENCES events(id)
);

-- 埋点属性数据表（存储事件属性的具体值）
DROP TABLE IF EXISTS tracking_attributes;
CREATE TABLE tracking_attributes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tracking_id BIGINT NOT NULL,           -- 关联的埋点数据ID
    attribute_id BIGINT NOT NULL,          -- 关联的属性ID
    attribute_value TEXT,                  -- 属性值
    FOREIGN KEY (tracking_id) REFERENCES tracking_data(id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES event_attributes(id)
);

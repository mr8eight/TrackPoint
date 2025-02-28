-- 事件表索引
CREATE INDEX idx_events_name ON events(name);
CREATE INDEX idx_events_status ON events(status);

-- 事件属性表索引
CREATE INDEX idx_event_attributes_event_id ON event_attributes(event_id);

-- 埋点数据表索引
CREATE INDEX idx_tracking_data_event_id ON tracking_data(event_id);
CREATE INDEX idx_tracking_data_event_time ON tracking_data(event_time);
CREATE INDEX idx_tracking_data_user_id ON tracking_data(user_id);

-- 埋点属性数据表索引
CREATE INDEX idx_tracking_attributes_tracking_id ON tracking_attributes(tracking_id);
CREATE INDEX idx_tracking_attributes_attribute_id ON tracking_attributes(attribute_id);

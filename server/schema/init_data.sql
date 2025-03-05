-- 初始化事件属性数据
INSERT INTO event_attributes (event_id, attribute_key, attribute_name, attribute_type, is_required) VALUES
-- 按钮点击事件属性
(1, 'button_type', '按钮类型', 'string', 1),

-- 加入购物车事件属性
(2, 'product_id', '商品ID', 'string', 1),
(2, 'product_price', '商品价格', 'number', 1),
(2, 'product_quantity', '商品数量', 'number', 1),

-- 页面跳转事件属性
(3, 'previous_url', '上一个页面URL', 'string', 1),
(3, 'dwell_time', '页面停留时间', 'number', 1),

-- 性能监控事件属性
(4, 'white_screen_time', '白屏时间', 'number', 1),
(4, 'fp', '首次绘制时间', 'number', 0),
(4, 'fcp', '首次内容渲染时间', 'number', 1),
(4, 'lcp', '最大内容绘制时间', 'number', 0),
(4, 'cls', '累计布局偏移', 'number', 0),

-- 异常监控事件属性
(5, 'error_type', '错误类型', 'string', 1),
(5, 'error_message', '错误信息', 'string', 1);

-- 初始化10条按钮点击埋点数据
INSERT INTO tracking_data (event_id, user_id, app_type, app_id, app_version, current_url, event_time, user_agent) VALUES
(1, 'user_12345', 'web', 'web_001', '1.0.0', 'https://example.com/login', '2025-01-05 09:15:22', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'),
(1, 'user_23456', 'h5', 'h5_002', '2.1.3', 'https://m.example.com/register', '2025-01-12 14:30:45', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'),
(1, 'user_34567', 'wechat_mini_program', 'wx_003', '3.2.1', 'pages/login/index', '2025-01-18 16:45:12', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 MQQBrowser/7.0 Mobile Safari/537.36'),
(1, 'user_45678', 'alipay_mini_program', 'alipay_004', '1.5.0', 'pages/survey/index', '2025-01-25 10:10:33', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 MQQBrowser/7.0 Mobile Safari/537.36'),
(1, 'user_56789', 'ios_app', 'ios_005', '4.0.1', 'app://home', '2025-02-01 13:25:44', 'ExampleApp/4.0.1 (iPhone; iOS 17.2; Scale/3.00)'),
(1, 'user_67890', 'android_app', 'android_006', '3.1.2', 'app://profile', '2025-02-08 11:03:36', 'ExampleApp/3.1.2 (Linux; Android 13; SM-G981B)'),
(1, 'user_78901', 'desktop', 'desktop_007', '5.0.0', 'https://desktop.example.com/login', '2025-02-15 15:20:55', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'),
(1, 'user_89012', 'web', 'web_008', '2.3.4', 'https://example.com/survey', '2025-02-22 17:35:11', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'),
(1, 'user_90123', 'h5', 'h5_009', '1.2.5', 'https://m.example.com/register', '2025-02-28 09:40:22', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'),
(1, 'user_01234', 'wechat_mini_program', 'wx_010', '3.0.0', 'pages/survey/index', '2025-03-01 12:50:33', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 MQQBrowser/7.0 Mobile Safari/537.36');

-- 初始化按钮点击事件属性值
INSERT INTO tracking_attributes (tracking_id, attribute_id, attribute_value) VALUES
(1, 1, '登录'),
(2, 1, '注册'),
(3, 1, '登录'),
(4, 1, '提交问卷'),
(5, 1, '登录'),
(6, 1, '注册'),
(7, 1, '登录'),
(8, 1, '提交问卷'),
(9, 1, '注册'),
(10, 1, '提交问卷');

-- 初始化10条页面跳转埋点数据
INSERT INTO tracking_data (event_id, user_id, app_type, app_id, app_version, current_url, event_time, user_agent) VALUES
(3, 'user_10001', 'web', 'web_001', '1.0.0', 'https://example.com/product', '2025-01-02 10:15:22', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'),
(3, 'user_10002', 'h5', 'h5_002', '2.1.3', 'https://m.example.com/product', '2025-01-10 14:30:45', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'),
(3, 'user_10003', 'wechat_mini_program', 'wx_003', '3.2.1', 'pages/product/index', '2025-01-15 16:45:12', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 MQQBrowser/7.0 Mobile Safari/537.36'),
(3, 'user_10004', 'alipay_mini_program', 'alipay_004', '1.5.0', 'pages/product/index', '2025-01-20 10:10:33', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 MQQBrowser/7.0 Mobile Safari/537.36'),
(3, 'user_10005', 'ios_app', 'ios_005', '4.0.1', 'app://product', '2025-01-25 13:25:44', 'ExampleApp/4.0.1 (iPhone; iOS 17.2; Scale/3.00)'),
(3, 'user_10006', 'android_app', 'android_006', '3.1.2', 'app://product', '2025-01-30 11:03:36', 'ExampleApp/3.1.2 (Linux; Android 13; SM-G981B)'),
(3, 'user_10007', 'desktop', 'desktop_007', '5.0.0', 'https://desktop.example.com/product', '2025-02-05 15:20:55', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'),
(3, 'user_10008', 'web', 'web_008', '2.3.4', 'https://example.com/product', '2025-02-10 17:35:11', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'),
(3, 'user_10009', 'h5', 'h5_009', '1.2.5', 'https://m.example.com/product', '2025-02-15 09:40:22', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'),
(3, 'user_10010', 'wechat_mini_program', 'wx_010', '3.0.0', 'pages/product/index', '2025-02-20 12:50:33', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 MQQBrowser/7.0 Mobile Safari/537.36');

-- 初始化页面跳转事件属性值
INSERT INTO tracking_attributes (tracking_id, attribute_id, attribute_value) VALUES
(11, 5, 'https://example.com/home'),  -- previous_url
(11, 6, '12345'),                    -- dwell_time
(12, 5, 'https://m.example.com/home'),
(12, 6, '45000'),
(13, 5, 'pages/home/index'),
(13, 6, '60000'),
(14, 5, 'pages/home/index'),
(14, 6, '120000'),
(15, 5, 'app://home'),
(15, 6, '180000'),
(16, 5, 'app://home'),
(16, 6, '300000'),
(17, 5, 'https://desktop.example.com/home'),
(17, 6, '90000'),
(18, 5, 'https://example.com/home'),
(18, 6, '150000'),
(19, 5, 'https://m.example.com/home'),
(19, 6, '200000'),
(20, 5, 'pages/home/index'),
(20, 6, '250000');

-- 初始化10条加入购物车埋点数据
INSERT INTO tracking_data (event_id, user_id, app_type, app_id, app_version, current_url, event_time, user_agent) VALUES
(2, 'user_20001', 'web', 'web_001', '1.0.0', 'https://example.com/product/12345', '2025-01-05 09:15:22', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'),
(2, 'user_20002', 'h5', 'h5_002', '2.1.3', 'https://m.example.com/product/23456', '2025-01-12 14:30:45', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'),
(2, 'user_20003', 'wechat_mini_program', 'wx_003', '3.2.1', 'pages/product/index?id=34567', '2025-01-18 16:45:12', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 MQQBrowser/7.0 Mobile Safari/537.36'),
(2, 'user_20004', 'alipay_mini_program', 'alipay_004', '1.5.0', 'pages/product/index?id=45678', '2025-01-25 10:10:33', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 MQQBrowser/7.0 Mobile Safari/537.36'),
(2, 'user_20005', 'ios_app', 'ios_005', '4.0.1', 'app://product/56789', '2025-01-30 13:25:44', 'ExampleApp/4.0.1 (iPhone; iOS 17.2; Scale/3.00)'),
(2, 'user_20006', 'android_app', 'android_006', '3.1.2', 'app://product/67890', '2025-02-05 11:03:36', 'ExampleApp/3.1.2 (Linux; Android 13; SM-G981B)'),
(2, 'user_20007', 'desktop', 'desktop_007', '5.0.0', 'https://desktop.example.com/product/78901', '2025-02-10 15:20:55', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'),
(2, 'user_20008', 'web', 'web_008', '2.3.4', 'https://example.com/product/89012', '2025-02-15 17:35:11', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'),
(2, 'user_20009', 'h5', 'h5_009', '1.2.5', 'https://m.example.com/product/90123', '2025-02-20 09:40:22', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'),
(2, 'user_20010', 'wechat_mini_program', 'wx_010', '3.0.0', 'pages/product/index?id=01234', '2025-02-25 12:50:33', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 MQQBrowser/7.0 Mobile Safari/537.36');

-- 初始化加入购物车事件属性值
INSERT INTO tracking_attributes (tracking_id, attribute_id, attribute_value) VALUES
(21, 2, '12345'),  -- product_id
(21, 3, '1999'),   -- product_price
(21, 4, '3'),      -- product_quantity
(22, 2, '23456'),
(22, 3, '2499'),
(22, 4, '2'),
(23, 2, '34567'),
(23, 3, '2999'),
(23, 4, '1'),
(24, 2, '45678'),
(24, 3, '1599'),
(24, 4, '4'),
(25, 2, '56789'),
(25, 3, '2799'),
(25, 4, '2'),
(26, 2, '67890'),
(26, 3, '1899'),
(26, 4, '5'),
(27, 2, '78901'),
(27, 3, '2999'),
(27, 4, '1'),
(28, 2, '89012'),
(28, 3, '2099'),
(28, 4, '3'),
(29, 2, '90123'),
(29, 3, '2599'),
(29, 4, '2'),
(30, 2, '01234'),
(30, 3, '1499'),
(30, 4, '4');

-- 初始化10条异常监控埋点数据
INSERT INTO tracking_data (event_id, user_id, app_type, app_id, app_version, current_url, event_time, user_agent) VALUES
(5, 'user_40001', 'web', 'web_001', '1.0.0', 'https://example.com/dashboard', '2025-01-03 10:15:22', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'),
(5, 'user_40002', 'h5', 'h5_002', '2.1.3', 'https://m.example.com/dashboard', '2025-01-10 14:30:45', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'),
(5, 'user_40003', 'wechat_mini_program', 'wx_003', '3.2.1', 'pages/dashboard/index', '2025-01-15 16:45:12', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 MQQBrowser/7.0 Mobile Safari/537.36'),
(5, 'user_40004', 'alipay_mini_program', 'alipay_004', '1.5.0', 'pages/dashboard/index', '2025-01-20 10:10:33', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4/7.0 Mobile Safari/537.36'),
(5, 'user_40005', 'ios_app', 'ios_005', '4.0.2', 'app://dashboard', '2025-01-25 13:25:44', 'ExampleApp/4.0.1 (iPhone; iOS 17.2; Scale/3.00)'),
(5, 'user_40006', 'android_app', 'android_006', '3.1.2', 'app://dashboard', '2025-01-30 11:03:36', 'ExampleApp/3.1.2 (Linux; Android 13; SM-G981B)'),
(5, 'user_40007', 'desktop', 'desktop_007', '5.0.0', 'https://desktop.example.com/dashboard', '2025-02-05 15:20:55', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'),
(5, 'user_40008', 'web', 'web_008', '2.3.4', 'https://example.com/dashboard', '2025-02-10 17:35:11', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'),
(5, 'user_40009', 'h5', 'h5_009', '1.2.5', 'https://m.example.com/dashboard', '2025-02-15 09:40:22', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'),
(5, 'user_40010', 'wechat_mini_program', 'wx_010', '3.0.0', 'pages/dashboard/index', '2025-02-20 12:50:33', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 MQQBrowser/7.0 Mobile Safari/537.36');

-- 初始化异常监控事件属性值
INSERT INTO tracking_attributes (tracking_id, attribute_id, attribute_value) VALUES
(31, 12, 'js错误'),  -- error_type
(31, 13, 'Uncaught TypeError: Cannot read property \'name\' of undefined'),  -- error_message
(32, 12, 'promise错误'),
(32, 13, 'Unhandled promise rejection: NetworkError when attempting to fetch resource'),
(33, 12, '资源加载错误'),
(33, 13, 'Failed to load resource: the server responded with a status of 404 (Not Found)'),
(34, 12, '手动捕获错误'),
(34, 13, 'Custom error: Invalid user input'),
(35, 12, 'js错误'),
(35, 13, 'Uncaught ReferenceError: x is not defined'),
(36, 12, 'promise错误'),
(36, 13, 'Unhandled promise rejection: Timeout after 5000ms'),
(37, 12, '资源加载错误'),
(37, 13, 'Failed to load resource: the server responded with a status of 500 (Internal Server Error)'),
(38, 12, '手动捕获错误'),
(38, 13, 'Custom error: Invalid API response'),
(39, 12, 'js错误'),
(39, 13, 'Uncaught SyntaxError: Unexpected token \'<\''),
(40, 12, '资源加载错误'),
(40, 13, 'Failed to load resource: net::ERR_CONNECTION_REFUSED');

-- 初始化10条性能监控埋点数据
INSERT INTO tracking_data (event_id, user_id, app_type, app_id, app_version, current_url, event_time, user_agent) VALUES
(4, 'user_30001', 'web', 'web_001', '1.0.0', 'https://example.com/dashboard', '2025-01-03 10:15:22', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'),
(4, 'user_30002', 'h5', 'h5_002', '2.1.3', 'https://m.example.com/dashboard', '2025-01-10 14:30:45', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'),
(4, 'user_30003', 'wechat_mini_program', 'wx_003', '3.2.1', 'pages/dashboard/index', '2025-01-15 16:45:12', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 MQQBrowser/7.0 Mobile Safari/537.36'),
(4, 'user_30004', 'alipay_mini_program', 'alipay_004', '1.5.0', 'pages/dashboard/index', '2025-01-20 10:10:33', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 MQQBrowser/7.0 Mobile Safari/537.36'),
(4, 'user_30005', 'ios_app', 'ios_005', '4.0.1', 'app://dashboard', '2025-01-25 13:25:44', 'ExampleApp/4.0.1 (iPhone; iOS 17.2; Scale/3.00)'),
(4, 'user_30006', 'android_app', 'android_006', '3.1.2', 'app://dashboard', '2025-01-30 11:03:36', 'ExampleApp/3.1.2 (Linux; Android 13; SM-G981B)'),
(4, 'user_30007', 'desktop', 'desktop_007', '5.0.0', 'https://desktop.example.com/dashboard', '2025-02-05 15:20:55', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'),
(4, 'user_30008', 'web', 'web_008', '2.3.4', 'https://example.com/dashboard', '2025-02-10 17:35:11', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'),
(4, 'user_30009', 'h5', 'h5_009', '1.2.5', 'https://m.example.com/dashboard', '2025-02-15 09:40:22', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'),
(4, 'user_30010', 'wechat_mini_program', 'wx_010', '3.0.0', 'pages/dashboard/index', '2025-02-20 12:50:33', 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 MQQBrowser/7.0 Mobile Safari/537.36');

-- 初始化性能监控事件属性值
INSERT INTO tracking_attributes (tracking_id, attribute_id, attribute_value) VALUES
(41, 7, '1200'),  -- white_screen_time
(41, 8, '1500'),  -- fp
(41, 9, '1800'),  -- fcp
(41, 10, '2000'),  -- lcp
(41, 11, '0.1'),  -- cls
(42, 7, '800'),
(42, 8, '1200'),
(42, 9, '1500'),
(42, 10, '1800'),
(42, 11, '0.05'),
(43, 7, '1000'),
(43, 8, '1300'),
(43, 9, '1600'),
(43, 10, '1900'),
(43, 11, '0.08'),
(44, 7, '900'),
(44, 8, '1100'),
(44, 9, '1400'),
(44, 10, '1700'),
(44, 11, '0.06'),
(45, 7, '1100'),
(45, 8, '1400'),
(45, 9, '1700'),
(45, 10, '2000'),
(45, 11, '0.09'),
(46, 7, '950'),
(46, 8, '1250'),
(46, 9, '1550'),
(46, 10, '1850'),
(46, 11, '0.07'),
(47, 7, '1050'),
(47, 8, '1350'),
(47, 9, '1650'),
(47, 10, '1950'),
(47, 11, '0.08'),
(48, 7, '850'),
(48, 8, '1150'),
(48, 9, '1450'),
(48, 10, '1750'),
(48, 11, '0.05'),
(49, 7, '1150'),
(49, 8, '1450'),
(49, 9, '1750'),
(49, 10, '2050'),
(49, 11, '0.1'),
(50, 7, '1000'),
(50, 8, '1300'),
(50, 9, '1600'),
(50, 10, '1900'),
(50, 11, '0.07');

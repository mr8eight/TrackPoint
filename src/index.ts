    // 导入相关模块
    import { ConfigOptions, loadConfig } from './monitor/loadConfig';
    import { errorCatcher } from './monitor/errorTracker';
    import { report } from './monitor/report';
    import { getCache } from './monitor/cache';

    /**
     * 初始化配置
     * @param options 初始化配置选项
     */
    function init(options: ConfigOptions): void {
        // ------- 加载配置 ----------
        // 1.拿到配置信息 
        // 2.注入监控代码
        loadConfig(options);

        
    
        //防止卸载时还有剩余的埋点数据没发送
        window.addEventListener('unload', () => {
            const data = getCache();
            report(data);
        });
    }

    // 导出
    export { init, errorCatcher };
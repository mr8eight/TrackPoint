// 导入相关模块
import { loadConfig } from './monitor/loadConfig';
import { errorCatcher } from './monitor/errorTracker';
import { lazyReport, report } from './monitor/report';
import { getCache } from './monitor/cache';

// 定义初始化配置函数的参数类型
interface InitOptions {
    // 这里可以根据实际情况添加更多具体的配置属性
    [key: string]: any;
}

/**
 * 初始化配置
 * @param options 初始化配置选项
 */
function init(options: InitOptions): void {
    // ------- 加载配置 ----------
    // 1.拿到配置信息 
    // 2.注入监控代码
    loadConfig(options);

    // 加入PV、UV监测


    //防止卸载时还有剩余的埋点数据没发送
    window.addEventListener('unload', () => {
        const data = getCache();
        report(data);
    });
}

// 导出
export { init, errorCatcher };
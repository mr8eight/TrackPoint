import { lazyReport } from './report';  // 假设 lazyReport 在其他文件中

export class PerformanceTracker {
    private reportUrl: string;

    constructor(reportUrl: string) {
        this.reportUrl = reportUrl;
        this.init();
    }

    // 初始化，监听文档加载完成事件
    private init() {
        if (document.readyState === "complete") {
            this.reportLoadTime();//如果 document.readyState 为 "complete"，则立即调用 reportLoadTime() 方法来收集性能数据并上报。
        } else {
            window.addEventListener("load", () => this.reportLoadTime());//如果没有，则监听 load 事件，在页面加载完成后调用 reportLoadTime() 方法。
        }
    }

    // 获取性能数据并发送上报
    private reportLoadTime() {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart;

        // const data = {
        //     loadTime: loadTime,//页面完全加载的时间（loadEventEnd - navigationStart）。
        //     domContentLoadedTime: domContentLoadedTime,//DOM 内容加载完成的时间（domContentLoadedEventEnd - navigationStart）。         
        // };

        // 使用现有的 lazyReport 函数进行上报
        this.lazyReport('dom渲染', {domContentLoadedTime: domContentLoadedTime});
        this.lazyReport('内容加载事件', {loadTime: loadTime});
    }

    // 使用引入的 lazyReport 进行上报
    private lazyReport(type: string, params: Record<string, any>): void {
        // 调用现有的 lazyReport 函数
        lazyReport(type, params);
    }
}
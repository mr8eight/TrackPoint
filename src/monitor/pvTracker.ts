import { lazyReport } from './report';

/**
 * 初始化 PV 统计
 */
export function pvTracker() {
    const trackPV = () => {
        // 触发 PV 埋点上报
        lazyReport('PV', { type: 'pv' });
    };

    // 监听页面加载事件，页面加载完成时触发 PV 统计
    window.addEventListener('load', trackPV);

    // 例如，使用 hashchange 事件监听 hash 路由变化
    window.addEventListener('hashchange', trackPV);
    // 使用 popstate 事件监听 history 路由变化
    window.addEventListener('popstate', trackPV);
}
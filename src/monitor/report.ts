import { getCache, addCache, clearCache } from './cache';

let timer: ReturnType<typeof setTimeout> | undefined;

interface ReportParams {
    [key: string]: any;
}

interface LogParams {
    appId?: string; // 项目的appId
    userId?: string; // 用户id
    type: string; // error/action/visit/user
    data: ReportParams; // 上报的数据
    currentTime: number; // 时间戳
    currentPage: string; // 当前页面
    ua: string; // ua信息
}

// 在Window下挂上自定义属性
declare global {
    interface Window {
        _app_id_: string;
        _user_id_: string;
        _delay_: number;
        _report_url_: string;
    }
}

export function lazyReport(type: string, params: ReportParams): void {
    const appId = window._app_id_;
    const userId = window._user_id_;
    const delay = window._delay_;

    const logParams: LogParams = {
        appId, // 项目的appId
        userId, // 用户id
        type, // error/action/visit/user
        data: params, // 上报的数据
        currentTime: new Date().getTime(), // 时间戳
        currentPage: window.location.href, // 当前页面
        ua: navigator.userAgent, // ua信息
    };

    let logParamsString = JSON.stringify(logParams);
    addCache(logParamsString);

    const data = getCache();

    if (delay === 0) { // delay=0相当于不做延迟上报
        report(data);
        return;
    }

    if (data.length > 10) {
        report(data);
        clearTimeout(timer);
        return;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
        report(data);
    }, delay) as unknown as number;
}

export function report(data: string[]): void {
    const url = window._report_url_;

    // ------- navigator/img方式上报 -------
    if (navigator.sendBeacon) { // 支持sendBeacon的浏览器
        navigator.sendBeacon(url, JSON.stringify(data));
    } else { // 不支持sendBeacon的浏览器
        let oImage = new Image();
        oImage.src = `${url}?logs=${data}`;
    }


    clearCache();
}
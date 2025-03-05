// import { getCache, addCache, clearCache } from './cache';

// let timer: ReturnType<typeof setTimeout> | undefined;

// interface AttributeItem {
//     attribute_key: string;
//     attribute_value: string;
//   }


//   interface ReportParams {
//     [key: string]: any;
//   }

// interface LogParams {
//     app_id?: string; // 项目的appId
//     user_id?: string; // 用户id
//     event_key: string; // error/action/visit/user
//     attributes: AttributeItem[]; // 上报的数据
//     event_time: string; // 时间
//     current_url: string; // 当前页面
//     user_agent: string; // ua信息
//     app_type: string;//web
//     app_version: string|null;
// }

// // 在Window下挂上自定义属性
// declare global {
//     interface Window {
//         _app_id_: string;
//         _user_id_: string;
//         _delay_: number;
//         _report_url_: string;
//     }
// }

// const currentTimeToString = function(){
//     const date = new Date(); 
  
//     const padZero = (num: number): string => {
//         return num < 10 ? `0${num}` : `${num}`;
//       };
    
//       const year = date.getFullYear();
//       const month = padZero(date.getMonth() + 1); // 月份从 0 开始，需 +1
//       const day = padZero(date.getDate());
//       const hours = padZero(date.getHours());
//       const minutes = padZero(date.getMinutes());
//       const seconds = padZero(date.getSeconds());
    
//       return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// }

// export function lazyReport(type: string, params: ReportParams): void {
//     const appId = window._app_id_;
//     const userId = window._user_id_;
//     const delay = window._delay_;

//     const attributes = Object.entries(params).map(([key, value]) => ({
//         attribute_key: key,
//         attribute_value: value,
//       }));

//     const logParams: LogParams = {
//         event_key: type, // error/action/visit/user
//         user_id: userId, // 用户id
//         app_type: 'web', //哪个端
//         app_id: appId, // 项目的appId
//         app_version: null, //app版本
//         current_url: window.location.href, // 当前页面
//         event_time: currentTimeToString(), // 时间"xxxx-xx-xx xx:xx:xx""
//         user_agent: navigator.userAgent, // ua信息
//         attributes: attributes, // 上报的数据
//     };

//     let logParamsString = JSON.stringify(logParams);
//     addCache(logParamsString);

//     const data = getCache();

//     if (delay === 0) { // delay=0相当于不做延迟上报
//         report(data);
//         return;
//     }

//     if (data.length > 10) {
//         report(data);
//         clearTimeout(timer);
//         return;
//     }

//     clearTimeout(timer);
//     timer = setTimeout(() => {
//         report(data);
//     }, delay) as unknown as number;
// }

// export function report(data: string[]): void {
//     try {
//         console.log('report 函数开始执行');
//         const url = window._report_url_;
//         const jsonData = JSON.stringify(data);
//         const curlCommandBeacon = `curl -X POST -H "Content-Type: application/json" -d '${jsonData}' "${url}"`;
//         const curlCommandImage = `curl "${url}?logs=${data.join(',')}"`;

//         console.log('Beacon curl command:', curlCommandBeacon);
//         console.log('Image curl command:', curlCommandImage);

//         if (navigator.sendBeacon) { 
//             navigator.sendBeacon(url, JSON.stringify(data));
//         } else { 
//             let oImage = new Image();
//             oImage.src = `${url}?logs=${data}`;
//         }

//         clearCache();
//     } catch (error) {
//         console.error('report 函数执行出错:', error);
//     }
// }


import { getCache, addCache, clearCache } from './cache';

let timer: ReturnType<typeof setTimeout> | undefined;

interface AttributeItem {
    attribute_key: string;
    attribute_value: string;
}

interface ReportParams {
    [key: string]: any;
}

interface LogParams {
    app_id?: string; // 项目的appId
    user_id?: string; // 用户id
    event_key: string; // error/action/visit/user
    attributes: AttributeItem[]; // 上报的数据
    event_time: string; // 时间
    current_url: string; // 当前页面
    user_agent: string; // ua信息
    app_type: string;//web
    app_version: string | null;
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

const currentTimeToString = function () {
    const date = new Date();

    const padZero = (num: number): string => {
        return num < 10 ? `0${num}` : `${num}`;
    };

    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1); // 月份从 0 开始，需 +1
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function lazyReport(type: string, params: ReportParams): void {
    const appId = window._app_id_;
    const userId = window._user_id_;
    const delay = window._delay_;

    const attributes = Object.entries(params).map(([key, value]) => ({
        attribute_key: key,
        attribute_value: value,
    }));

    const logParams: LogParams = {
        event_key: type, // error/action/visit/user
        user_id: userId, // 用户id
        app_type: 'web', //哪个端
        app_id: appId, // 项目的appId
        app_version: null, //app版本
        current_url: window.location.href, // 当前页面
        event_time: currentTimeToString(), // 时间"xxxx-xx-xx xx:xx:xx""
        user_agent: navigator.userAgent, // ua信息
        attributes: attributes, // 上报的数据
    };

    let logParamsString = JSON.stringify(logParams);

    if (delay === 0) {
        report(logParams); // 直接传递对象
        return;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
        report(logParams); // 直接传递对象
    }, delay) as unknown as number;
}


export function report(data: LogParams): void { // 修改入参为单个对象
    try {
        const url = window._report_url_;
        const jsonData = JSON.stringify(data); // 序列化单个对象
        
        // 修复 curl 命令（移除数组操作）
        const curlCommandBeacon = `curl -X POST -H "Content-Type: application/json" -d '${jsonData}' "${url}"`;
        const curlCommandImage = `curl "${url}?logs=${encodeURIComponent(jsonData)}"`;

        // console.log('Beacon curl command:', curlCommandBeacon);
        // console.log('Image curl command:', curlCommandImage);

        if (navigator.sendBeacon) { 
            navigator.sendBeacon(url, jsonData); 
            console.log('Beacon curl command:', curlCommandBeacon);
        } else { 
            let oImage = new Image();
            oImage.src = `${url}?logs=${encodeURIComponent(jsonData)}`;
            console.log('Image curl command:', curlCommandImage);
        }

        // 清除缓存（如果不需要批量上报）
        // clearCache(); 
    } catch (error) {
        console.error('report 函数执行出错:', error);
    }
}
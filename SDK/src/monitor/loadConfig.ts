import { autoTrackerReport } from './actionTracker';
import { hashPageTrackerReport, historyPageTrackerReport } from './pageTracker';
import { errorTrackerReport } from './errorTracker';
import { blankScreen } from './blankScreenTracker';
import { pvTracker } from './pvTracker';
import { uvTracker } from './uvTracker';
import { observeWebVitals } from './webVitalTracker';

// 定义配置选项的接口
export interface ConfigOptions {
  appId?: string; // 系统id
  userId?: string; // 用户id
  reportUrl: string; // 后端url
  autoTracker: boolean; // 自动埋点
  delay: number; // 延迟和合并上报的功能
  hashPage: boolean; // 是否hash录有
  errorReport: boolean; // 是否开启错误监控
  blankReport: boolean; // 是否开启空白页面监控
  pvReport: boolean; //是否开启pv监测
  uvReport: boolean;//是否开启uv监测
  webVitalsReport:boolean;//是否开启webVitals监测
}

/**
 * 加载配置
 * @param options 配置选项
 */
export function loadConfig(options: ConfigOptions) {
  const { 
    appId,  // 系统id
    userId, // 用户id
    reportUrl, // 后端url, http://localhost:3000/tracking
    autoTracker, // 自动埋点
    delay, // 延迟和合并上报的功能
    hashPage, // 是否hash录有
    errorReport, // 是否开启错误监控
    blankReport, // 是否开启空白页面监控
    pvReport, //是否开启pv监测
    uvReport, //是否开启uv监测
    webVitalsReport, //是否开启webVitals监测

  } = options;

  // --------- appId ----------------
  if (appId) {
    (window as any)['_app_id_'] = appId;
  }

  // --------- userId ----------------
  if (userId) {
    (window as any)['_user_id_'] = userId;
  }

  // --------- 服务端地址 ----------------
  if (reportUrl) {
    (window as any)['_report_url_'] = reportUrl; // http://localhost:3000/tracking
  }

  // -------- 合并上报的间隔 ------------
  if (delay) {
    (window as any)['_delay_'] = delay;
  }

  // --------- 是否开启错误监控 ------------
  if (errorReport) {
    errorTrackerReport();
  }

  // --------- 是否开启无痕埋点 ----------
  if (autoTracker) {
    autoTrackerReport();
  }

  // ----------- 路由监听 --------------
  if (hashPage) {
    hashPageTrackerReport(); // hash路由上报
  } else {
    historyPageTrackerReport(); // history路由上报
  }

  if (blankReport) {
    blankScreen(); // 空白页面监控
  }

  if(pvReport){
    pvTracker();//pv监测
  }

  if(uvReport){
    uvTracker();//uv监测
  }

  if(webVitalsReport){
    observeWebVitals();
  }

}

/**
 * 获取元素的dom路径
 * @param element 目标元素
 * @returns DOM路径字符串
 */
export function getPathTo(element: HTMLElement): string {
  if (element.id !== '')
    return '//*[@id="' + element.id + '"]';
  if (element === document.body)
    return element.tagName;
  
  let ix = 0;
  let siblings = element.parentNode?.childNodes;
  if (siblings) {
    for (let i = 0; i < siblings.length; i++) {
      let sibling = siblings[i] as HTMLElement;
      if (sibling === element)
        return getPathTo(element.parentNode as HTMLElement) + '/' + element.tagName + '[' + (ix + 1) + ']';
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
        ix++;
    }
  }
  return ''; // 理论上不会走到这里，但为了类型检查添加
}
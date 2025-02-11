import { lazyReport } from './report';
    
/**
 * 全局错误捕获
 */
export function errorTrackerReport() : void {
  // --------  js error ---------
 // 监听 js 错误
window.onerror = (msg, url, line, column, error) => {
  lazyReport("js错误",{
      msg,
      line,
      column,
      subType: 'js错误',
      pageURL: url,
  })
}

  // ------  promise error  --------
  window.addEventListener('unhandledrejection', (event) => {
    // 直接通过event.reason获取错误对象
    const error = event.reason;
    
    try {
      lazyReport("promise错误", {
        error: (error === null || error === void 0 ? void 0 : error.stack) || error.toString(),
        subType: 'promise',
        pageURL: window.location.href,
      });
    } catch (e) {
      // 防止上报逻辑自身出错导致死循环
      console.error('Error reporting failed:', e);
    }
    event.preventDefault();
  });
  // ------- resource error --------
  window.addEventListener('error', (event) => {
    const target = event.target;
    // 过滤掉非资源加载错误（因为 window 上的 error 事件也会捕获 JS 错误，这里只处理资源加载错误）
    if (!(target instanceof HTMLScriptElement || target instanceof HTMLImageElement || target instanceof HTMLLinkElement)) {
      return;
    }
    let resourceType;
    let resourceUrl;
    if (target instanceof HTMLScriptElement) {
      resourceType = 'script';
      resourceUrl = target.src;
    } else if (target instanceof HTMLImageElement) {
      resourceType = 'image';
      resourceUrl = target.src;
    } else if (target instanceof HTMLLinkElement) {
      resourceType = 'stylesheet';
      resourceUrl = target.href;
    }
    lazyReport("资源加载错误", {
      subType: 'resource',
      resourceType,
      resourceUrl,
      pageURL: window.location.href,
    });
  });

}

/**
 * 手动捕获错误
 */

export function errorCatcher(error : Error , msg : string ) {
  lazyReport("手动捕获错误",{
    error: error.stack,
    msg,
    subType: 'manual',
    pageURL: window.location.href,
  })
}
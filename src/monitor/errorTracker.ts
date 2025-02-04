import { lazyReport } from './report';
    
/**
 * 全局错误捕获
 */
export default function errorTrackerReport() : void {
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
    if(!target) return;
      lazyReport("资源加载错误",{
        subType: 'resource',
      })
    
    })

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
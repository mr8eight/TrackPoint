/*
    页面停留时长埋点
    上报停留的页面、停留的时长、

*/
import { lazyReport } from "./report";

// 记录页面进入时的时间戳
const startPageTime: number = Date.now();

export function pageTracker(): void {
  // 上报页面停留时长的函数
  function reportDuration(): void {
    const duration: number = Date.now() - startPageTime;
    // 使用 lazyReport 上报数据
    lazyReport("pageDuration", {
      pageURL: window.location.href,
      duration: duration
    });
  }

  window.addEventListener("beforeunload", reportDuration);

  // 兼容单页应用以及页面在后台时的情况
  document.addEventListener("visibilitychange", (): void => {
    if (document.visibilityState === "hidden") {
      reportDuration();
    }
  });
}
import { lazyReport } from "./report";

// 用于记录上次页面进入的时间
let lastPageTime: number = Date.now();

/**
 * 监听 hash 路由变化，并上报
 */
export function hashPageTrackerReport(): void {
  window.addEventListener('hashchange', () => {
    const currentTime = Date.now();
    const dwellTime = currentTime - lastPageTime;
    lastPageTime = currentTime;
    lazyReport("hashPage", {
      pageURL: window.location.href,
      event: "hashchange",
      dwellTime
    });
  });
  // 初始上报一次，不计算停留时间
  lazyReport("hashPage", {
    pageURL: window.location.href,
    event: "initial"
  });
}

/**
 * 监听 history 路由变化，并上报
 */
export function historyPageTrackerReport(): void {
  // 监听 popstate 事件（后退、前进）
  window.addEventListener('popstate', () => {
    const currentTime = Date.now();
    const dwellTime = currentTime - lastPageTime;
    lastPageTime = currentTime;
    lazyReport("historyPage", {
      pageURL: window.location.href,
      event: "popstate",
      dwellTime: dwellTime
    });
  });

  // 重写 pushState，捕获主动路由变化
  const originalPushState = history.pushState;
  history.pushState = function (state: any, title: string, url?: string | null): void {
    originalPushState.apply(this, [state, title, url]);
    const currentTime = Date.now();
    const dwellTime = currentTime - lastPageTime;
    lastPageTime = currentTime;
    lazyReport("historyPage", {
      pageURL: window.location.href,
      event: "pushState",
      dwellTime: dwellTime
    });
  };

  // 重写 replaceState，捕获主动路由变化
  const originalReplaceState = history.replaceState;
  history.replaceState = function (state: any, title: string, url?: string | null): void {
    originalReplaceState.apply(this, [state, title, url]);
    const currentTime = Date.now();
    const dwellTime = currentTime - lastPageTime;
    lastPageTime = currentTime;
    lazyReport("historyPage", {
      pageURL: window.location.href,
      event: "replaceState",
      dwellTime: dwellTime
    });
  };
}
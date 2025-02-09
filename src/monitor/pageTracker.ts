// TypeScript: src/monitor/pageTracker.ts
import { lazyReport } from "./report";

/**
 * 监听 hash 路由变化，并上报
 */
export function hashPageTrackerReport(): void {
  window.addEventListener('hashchange', () => {
    lazyReport("hashPage", {
      pageURL: window.location.href,
      event: "hashchange"
    });
  });
  // 初始上报一次
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
    lazyReport("historyPage", {
      pageURL: window.location.href,
      event: "popstate"
    });
  });

  // 重写 pushState 和 replaceState，捕获主动路由变化
  const originalPushState = history.pushState;
  history.pushState = function (state: any, title: string, url?: string | null): void {
    originalPushState.apply(this, [state, title, url]);
    lazyReport("historyPage", {
      pageURL: window.location.href,
      event: "pushState"
    });
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function (state: any, title: string, url?: string | null): void {
    originalReplaceState.apply(this, [state, title, url]);
    lazyReport("historyPage", {
      pageURL: window.location.href,
      event: "replaceState"
    });
  };
}
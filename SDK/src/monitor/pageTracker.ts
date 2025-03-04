import { lazyReport } from "./report";

// 模块级状态管理
interface RouterState {
  beforePage: string;
  lastPageTime: number;
}

// 全局路由状态（默认未激活）
let activeState: RouterState | null = null;

// 卸载事件监听（只需绑定一次）
const setupUnloadListener = () => {
  window.addEventListener('beforeunload', () => {
    if (activeState) {
      const { beforePage, lastPageTime } = activeState;
      const dwellTime = Date.now() - lastPageTime;
      lazyReport("pageChange", {
        previous_url: beforePage,
        current_url: window.location.href,
        dwell_time: dwellTime,
        event_type: "unload"
      });
    }
  });
};

// 统一上报逻辑
const reportPageChange = (currentUrl: string) => {
  if (!activeState) return;
  
  const { beforePage, lastPageTime } = activeState;
  const dwellTime = Date.now() - lastPageTime;
  
  lazyReport("pageChange", {
    previous_url: beforePage,
    current_url: currentUrl,
    dwell_time: dwellTime
  });

  // 更新状态
  activeState.beforePage = currentUrl;
  activeState.lastPageTime = Date.now();
};

// 初始化路由状态
const initRouterState = () => {
  activeState = {
    beforePage: window.location.href,
    lastPageTime: Date.now()
  };
  setupUnloadListener();
  // 初始上报
  lazyReport("pageChange", {
    previous_url: '',
    current_url: window.location.href,
    dwell_time: 0
  });
};

/**
 * 监听 Hash 路由变化
 */
export function hashPageTrackerReport(): void {
  initRouterState();
  
  window.addEventListener('hashchange', () => {
    const currentUrl = window.location.href;
    if (currentUrl !== activeState!.beforePage) {
      reportPageChange(currentUrl);
    }
  });
}

/**
 * 监听 History 路由变化
 */
export function historyPageTrackerReport(): void {
  initRouterState();
  
  // 重写 History API
  const wrapHistoryMethod = (originalMethod: Function) => {
    return function (state: any, title: string, url?: string | null) {
      const oldUrl = window.location.href;
      originalMethod.apply(history, [state, title, url]);
      const newUrl = window.location.href;
      if (newUrl !== oldUrl) {
        reportPageChange(newUrl);
      }
    };
  };

  history.pushState = wrapHistoryMethod(history.pushState);
  history.replaceState = wrapHistoryMethod(history.replaceState);

  // 监听 popstate
  window.addEventListener('popstate', () => {
    const currentUrl = window.location.href;
    if (currentUrl !== activeState!.beforePage) {
      reportPageChange(currentUrl);
    }
  });
}
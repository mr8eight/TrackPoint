// webVitalTracker.ts
import { lazyReport } from './report';

export function observeWebVitals() {
  observePaintTime('FP', 'first-paint');
  observePaintTime('FCP', 'first-contentful-paint');
  observeLCPTime();
  observeCLSValue();
}

// ================ 各指标监听逻辑 ================

/**​ 监听 FP/FCP 时间 */
function observePaintTime(metricName: 'FP' | 'FCP', entryName: string) {
  const observer = new PerformanceObserver(list => {
    const entry = list.getEntriesByName(entryName)[0];
    if (entry) {
      lazyReport('performance_monitor', { metricName: entry.startTime });
      observer.disconnect();
    }
  });
  observer.observe({ type: 'paint', buffered: true });
}

/**​ 监听 LCP 时间（持续更新最大值） */
function observeLCPTime() {
  let maxLcp = 0;

  const observer = new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      if (entry.startTime > maxLcp) {
        maxLcp = entry.startTime;
        lazyReport('performance_monitor', { 'LCP': maxLcp });
      }
    });
  });
  observer.observe({ type: 'largest-contentful-paint', buffered: true });
}

/**​ 监听 CLS 累积偏移值 */
function observeCLSValue() {
  let clsValue = 0;

  const observer = new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      if ('value' in entry && !(entry as any).hadRecentInput) {
        clsValue += Number((entry as any).value);
      }
    });
  });

  try {
    observer.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.warn('CLS monitoring not supported');
  }

  // 最终上报 CLS 值
  window.addEventListener('beforeunload', () => {
    if (clsValue > 0) {
      lazyReport('performance_monitor', { 'CLS': Number(clsValue.toFixed(4)) });
    }
  });
}
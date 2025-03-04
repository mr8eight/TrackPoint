import { lazyReport } from './report';

const VISITED_KEY = '_your_app_visited_';

export function uvTracker() {
  const trackUV = () => {
    let isNewVisitor = true;

    // 优先使用 _user_id_ 判断
    if (window._user_id_) {
      isNewVisitor = false;
    } else {
      // 如果 _user_id_ 不存在，降级到 localStorage
      try {
        isNewVisitor = !localStorage.getItem(VISITED_KEY);
        if (isNewVisitor) {
          localStorage.setItem(VISITED_KEY, 'true');
        }
      } catch (error) {
        console.error('访问 localStorage 失败:', error);
      }
    }

    // 上报 UV 数据
    lazyReport('UV', { 
      newVisitor: isNewVisitor 
    });
  };

  // 页面加载时进行 UV 统计
  if (document.readyState === 'complete') {
    trackUV();
  } else {
    window.addEventListener('DOMContentLoaded', trackUV);
  }
}


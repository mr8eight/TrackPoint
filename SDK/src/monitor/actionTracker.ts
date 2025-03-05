
import { lazyReport } from './report';
// import { getPathTo } from './loadConfig';

/**
 * 手动上报
 */
export function tracker(actionType: string) : void  {
  lazyReport('button_click', {
    button_type: actionType
  });
}

/**
 * 自动上报
 */
export function autoTrackerReport() : void {
  // 自动上报
  document.body.addEventListener('click', function (e : MouseEvent ) : void {
    const clickedDom = e.target as HTMLElement;

    // 获取标签上的data-target属性的值
    let target : string | null = clickedDom?.getAttribute('data-target');

    // 获取标签上的data-no属性的值
    let no : string | null = clickedDom?.getAttribute('data-no');
    // 避免重复上报
    if (no) {
      return;
    }

    if (target) {
      lazyReport('button_click', {
        button_type: target
      });
    } 
    // else {
    //   // 获取被点击元素的dom路径
    //   const path : string = getPathTo(clickedDom);
    //   lazyReport('action', {
    //     actionType: 'click',
    //     data: path
    //   });
    // }
  }, false);
}

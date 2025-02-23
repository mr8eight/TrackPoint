import { lazyReport } from './report';

/**
 * 初始化 UV 统计
 */
export function uvTracker() {
    const trackUV = () => {
        let isNewVisitor = true;
        try {
            // 从 localStorage 中获取是否已访问的标记
            isNewVisitor =!localStorage.getItem('visited');
            if (isNewVisitor) {
                // 若为新访客，设置标记为已访问
                localStorage.setItem('visited', 'true');
            }

            lazyReport('UV', { 
                type: 'uv', 
                Visitor: isNewVisitor 
            });

        } catch (storageError) {
            console.error('使用 localStorage 时出错:', storageError);
        }
    };

    // 页面加载时进行 UV 统计
    window.addEventListener('load', trackUV);
}
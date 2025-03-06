import React from 'react';
import { tracker } from 'sdk';


//可以自定义埋点点击事件，推荐埋点选项事件有：
// 1. 注册按钮
// 2. 登录按钮
// 3. 搜索按钮
// 4. 收藏按钮
// 5. 分享按钮
// 6. 点赞按钮
// 7. 评论按钮
// 8. 提交按钮
// 9. 确认按钮
// 10. 取消按钮 ……

const initButton = () => {
    return (
        <button data-target="点击注册按钮">注册</button>
    );
};


const MyButton = () => {
    const handleClick = () => {
        tracker('可自定义按钮点击事件');
    };

    return (
        <button onClick={handleClick}> 可自定义事件 </button>
    );
};



export { initButton, MyButton };
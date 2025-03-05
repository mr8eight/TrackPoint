import React from 'react';
// 假设 tracker 函数从这里导入，需要根据实际情况修改
// 修改现有引入语句为
import { tracker } from 'sdk';

// 其他代码保持不变...

const initButton = () => {
    return (
        <button data-target="注册按键">注册</button>
    );
};

const MyButton = () => {
    const handleClick = () => {
        tracker( '自定义按钮点击事件');
    };

    return (
        <button onClick={handleClick}>自定义</button>
    );
};

export { initButton, MyButton };
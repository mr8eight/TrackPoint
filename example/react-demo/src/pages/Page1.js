import React from 'react';
import { Link } from 'react-router-dom';
// 从 buttons.tsx 文件中导入 initButton 和 MyButton 组件
import { initButton, MyButton } from '../components/buttons';

const Page1 = () => {
    return (
        <div>
            <h1>Page 1</h1>
            {/* 使用 initButton 组件 */}
            {initButton()}
            {/* 使用 MyButton 组件 */}
            {MyButton()}
            <button><Link to="/page2">Go to Page 2</Link></button>
            <button><Link to="/page3">Go to Page 3</Link></button>
        </div>
    );
};

export default Page1;
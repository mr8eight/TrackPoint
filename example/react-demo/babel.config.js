module.exports = {
    presets: [
        // 处理现代 JavaScript 特性
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: ['last 2 versions', 'not dead', '> 0.2%']
                }
            }
        ],
        // 处理 React JSX 语法
        '@babel/preset-react'
    ]
};
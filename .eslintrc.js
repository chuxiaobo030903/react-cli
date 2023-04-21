module.exports = {
    root: true, // // 告诉eslint找当前配置文件不能往父级查找
    env: { // 全局环境
        browser: true,
        es2021: true, // 例子：这样设置之后，就支持新的 ES6 全局变量和类型
        node: true, // 例子：这样设置之后，就支持新的 node 全局变量和类型
    },
    parserOptions: {  // 优先级低于parse的语法解析配置
        parser: '@typescript-eslint/parser', // 指定ESlint的解析器
        ecmaVersion: 2020, // 允许使用ES语法
        sourceType: 'module', // 允许使用import
    },
    extends: [ // 让 ESlint 添加规则模块
        "eslint:recommended", // 启用 ESLint 核心规则，这些规则报告一些常见问题。
        "plugin:vue/essential", // 例子：让 ESlint 能检查vue相关代码语法
        "plugin:@typescript-eslint/recommended" // 例子：让 ESlint 能检查typescript相关代码语法
    ],
    plugins: [], // 使用第三方插件检查规则
    rules: { // 规则，手动自定义代码规范
        'quotes': ['warn', 'single'], // 引号类型 `` '' ""
    },
    globals: { // 全局变量
        变量名: 'readonly', // false、readable、readonly 这 3 个是等价的，表示变量只可读不可写
        变量名: 'writable', // true、writeable、writable 这 3 个是等价的，表示变量可读可写；
    }
};

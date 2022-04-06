<p align="center">
    <img alt="Trace" src="https://raw.githubusercontent.com/L018/Trace/main/images/Trace512.png" width="256">
</p>

<p align="center">
    <strong>Trace - A Chrome extension for web analytics</strong>
</p>

<p align="center">
    <a href="#"><img alt="Chrome 93+" src="https://img.shields.io/badge/Chrome-93%2B-blue"></a>
    <a href="#"><img alt="version v0.1" src="https://img.shields.io/badge/version-v0.1-blue"></a>
    <a href="https://github.com/L018/Trace/blob/main/LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/MIT-License-blue"></a>
</p>

Trace 是一个用于网站分析的 Chrome 扩展, 全称 Trace Trace, aka T 次方。

Trace 可以用于帮助追踪网站的大部分行为，不限于 Cookie 的设置获取、Element 的 创建调用 以及 Event 的注册监听；基于 hookProxy 方法可以实现对大部分 window 和 document 属性及方法的追踪。另外 Trace 还可以完成 Block 请求，JS 注入，响应流转(自造名词)，变量追踪——记录运行时产生的字符串和位置以及未来可能比较有效的JS反混淆。

## Installation

1. Chrome 应用商店安装 [Trace](https://chrome.google.com/webstore/detail/trace/cfpdmpepieedplgjphncpgiipkcjennh)
2. 下载安装

    下载文件 [main.crx](https://github.com/L018/Trace/releases/latest/download/main.crx) 拖拽到 Chrome 中完成安装
3. 下载源码
    1. 运行 minify.js 或下载 [Trace-dist.zip](https://github.com/L018/Trace/releases/latest/download/Trace-dist.zip)
    2. 打开地址 chrome://extensions/, 开启 Developer mode 开关
    3. click `Load unpacked`, 选择 `Trace-dist` 加载

## Features

1. 追踪Cookie
2. 追踪事件
3. 追踪对象
4. 脚本注入
5. 阻止请求
6. 变量追踪
7. JS反混淆
8. 响应流转

<p align="center">
    <img alt="Options" src="https://raw.githubusercontent.com/L018/Trace/main/readme-files/options.jpg" width="900">
</p>

## Usage

一如往常分析网站一样，打开 `Developer tools`, 检查 `Disable cache` 开关

`Popup` 页上的按钮所设即所得，在弹框消失的时候设置会自动对当前焦点 Tab 页生效。

`Options` 页中有每一个开关的详细说明和设置，但是有几点需要注意:
  1. 开关的生效区域有的是针对全局，有一些只对当前 Tab 有效
  2. 变量追踪、JS反混淆、响应流转打开后，Chrome 会显示 `"Trace" started debugging this browser` 提示，切记不要关闭，否则设置无法生效(包括所有正在使用该功能的 Tab)
  3. 记得保存设置，并且保存只是保存，并不修改任何设置，需要针对调试的 Tab 重新开关 `Popup`，使设置生效

扩展会向运行环境中抛出以下变量或函数：

```javascript
const Proxiable  // 理论可被 hookProxy 的所有 window 属性或方法
const DocProxiable   // 理论可被 hookProxy 的所有 document 属性或方法

/**
 * 使用代理 hook 任意对象
 *
 * hookFunction = function(value, ...arguments){
 *     // do something;
 *     return value
 * }
 * hookFunction.handler = 'apply'
 * 
 * @param {*} obj 需要 hook 对象
 * @param {string=} objName hook 对象自定义名称 (可选)
 * @param {(Function|Array.<Function>)=} hookFunctions 对代理对象不同 handler 的自定义操作函数 (可选)
 * @returns {Proxy} obj 对象的代理
 */
function hookProxy(obj, objName, hookFunctions) {}

//可在脚本注入功能中或直接在 Console 中使用 `hookProxy` 完成对某些对象进行 hook
//例: window[p] = hookProxy(window[p]);
//然后在 Console 中查看输出信息


// 变量追踪中用于查询字符串首次出现位置
function t2SearchImprint(anything) {}
```

`阻止请求` 这一功能是对 Chrome `Network request blocking` 功能的补充，可以通过正则进行精细化控制，并且全局有效。临时阻止请求，Chrome 自带的 `Block request domain` 用的还是很舒服的

`变量追踪` 需要清除网页缓存，禁用缓存，可在导致跳转关键URL打上断点(字符串定位数据存储在当前 Tab 中，跳转会导致数据丢失，不涉及跳转略过)，然后使用 `t2SearchImprint` 在 Console 中进行查找

咳咳

通过 Chrome 提供的响应拦截功能，不仅可以实现响应的自定义修改，而且跳过了中间代理软件，流量特征完全是浏览器的

通过拦截功能，加上 AST 或其他函数处理，理论可以实现响应的任意修改，不限于自动反混淆。 **未来可期**

babelPlugins.js 文件中定义了 Babel 插件的结构，通过 `export`, `Options` 页可自动发现并加载（感兴趣的自行查看）

`响应流转` 这一功能会将页面的响应体二次转发到设定的接收地址中去，可以用于对特定响应进行存储等功能

## Roadmap

不定期更新

暂不增加新功能，修改现有功能 Bug, 优化使用体验，直至 v1.0

由于 Chrome Extension 某些限制，目前还无法实现用户添加自定义 babel plugin

## Credits

[Babel](https://github.com/babel/babel) - The compiler for writing next generation JavaScript

[Pico](https://github.com/picocss/pico) - Minimal CSS Framework for semantic HTML

## License

[MIT License](https://github.com/L018/Trace/blob/main/LICENSE)

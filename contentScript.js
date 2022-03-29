/**
 * Copyright (c) 2022 L018. All rights reserved.
 * Licensed under MIT
 */


// Content scripts are executed in an "isolated world" environment.
// https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions
// chrome content security policy, You can't use inline scripting in your Chrome App pages. The restriction bans both <script> blocks and event handlers (<button onclick="...">).
// https://stackoverflow.com/questions/25625412/chrome-extension-content-security-policy-executing-inline-code?rq=1


// https://intoli.com/blog/javascript-injection/


/**
 * document_start 
 * Scripts are injected after any files from css, but before any other DOM is constructed or any other script is run.
 * 此时 document.readyState = 'loading'，head 节点可能还未创建
 * chrome.storage.local.get 延迟时间不确定，注入事件发生时 head node 可能还未创建，也可能部分 script 已经解析执行
 * <link rel="preload" href="https://xxx.js" as="script"/> 预加载脚本不太好拦截
 * 
 * chrome.scripting.executeScript 注入需要指定 tab ,且 content script 无法访问此 API
 */
!function(){
    let s = document.createElement('script');
    s.src = chrome.runtime.getURL('traceImprint.js');
    s.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}();


insertScript();

async function insertScript() {
    let storage = await chrome.storage.local.get({'settings':{}, 'inject':[]});
    
    let settingsMeta = document.createElement('meta');
    settingsMeta.name = 't2:settings';
    settingsMeta.content = JSON.stringify(storage.settings);
    (document.head || document.documentElement).appendChild(settingsMeta);

    let injectMeta = document.createElement('meta');
    injectMeta.name = 't2:inject';
    injectMeta.content = JSON.stringify(storage.inject);
    (document.head || document.documentElement).appendChild(injectMeta);


    let s = document.createElement('script');
    s.src = chrome.runtime.getURL('injectScript.js');
    s.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.msgName === 'respCookies'){
        console.log(...message.value)
    }
    return true
});
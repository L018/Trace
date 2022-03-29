/**
 * Copyright (c) 2022 L018. All rights reserved.
 * Licensed under MIT
 */


// https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/#content-security-policy
// mv3 不允许使用 unsafe-eval
// "content_security_policy": {
//     "extension_pages": "script-src 'self' 'unsafe-eval'; object-src 'self'"
// }
// https://github.com/babel/babel/issues/13574
// https://stackoverflow.com/questions/48047150/chrome-extension-compiled-by-webpack-throws-unsafe-eval-error

import './babel.min.js';
import { imprintPlugin, babelPlugins } from './babelPlugins.js';
const babel = Babel.babel;

// console.log(imprintPlugin, babelPlugins);

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    //$&表示整个被匹配的字符串
}

function cookieMessage(tab) {
    return async (details) => {
        for (let h of details.responseHeaders) {
            if (h.name.toLowerCase() === 'set-cookie') {
                try {
                    await chrome.tabs.sendMessage(tab.id, { 'msgName': 'respCookies', 'value': [h.name, h.value, 'at', details.url] });
                } catch (error) {
                }
            }
        }
    }
}


// regexFilter
// string optional

// Regular expression to match against the network request url. This follows the RE2 syntax.

// Note: Only one of urlFilter or regexFilter can be specified.

// Note: The regexFilter must be composed of only ASCII characters. This is matched against a url where the host is encoded in the punycode format (in case of internationalized domains) and any other non-ascii characters are url encoded in utf-8.


async function updateSetting (){
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    // console.log(tab);
    if (!(tab && tab.url.startsWith('http'))){
        // console.log("Can't query current tab");
        return
    }
    let storage = await chrome.storage.local.get({ 'settings': {}, 'inject':[] , 'block':{'setRuleIds':[], 'rules':[]}, 'interceptTabId': []});
    let addRules = [];
    let setRuleIds = [];
    let rules = storage.block.rules;
    for (let i=0; i<rules.length; i++){
        if (rules[i].status) {
            addRules.push(
                {
                    id: i + 1,
                    priority: 1,
                    action: { type: 'block' },
                    condition: {
                        regexFilter: rules[i].regexFilter,
                        requestMethods: ['get'],
                    }
                }
            );
            setRuleIds.push(i + 1);
        }
    }
    /**
     * 重定向规则
{
"id": 4,
"priority": 1,
"action": { "type": "redirect", "redirect": { "url": "https://example.com" } },
"condition": { "regexFilter": "google.com" }
},
     */
    // console.log(storage, addRules, setRuleIds);
    // 规则集id 可以重复删除但是不能重复添加
    if(storage.settings.blockReq){
        await chrome.declarativeNetRequest.updateSessionRules({
            addRules: addRules,
            removeRuleIds: storage.block.setRuleIds
        });
        await chrome.storage.local.set({ 'block':{'setRuleIds':setRuleIds, 'rules':rules}});
    } else {
        await chrome.declarativeNetRequest.updateSessionRules({
            addRules: [],
            removeRuleIds: storage.block.setRuleIds
        });
        await chrome.storage.local.set({ 'block':{'setRuleIds':[], 'rules':rules}});
    }

    if (storage.settings.deobfuscate || storage.settings.traceImprint ||storage.settings.respTransfer){
        if (!storage.interceptTabId.includes(tab.id)){
            await enableInterceptResp(tab);
            storage.interceptTabId.push(tab.id);
            await chrome.storage.local.set({ 'interceptTabId': storage.interceptTabId });
        }
    } // else 不能单独关，只能单独开

    let cookieMessageFun = cookieMessage(tab);

    if(storage.settings.traceCookie){
        // console.log('add cookieMessage');
        await chrome.webRequest.onHeadersReceived.addListener(
            cookieMessageFun,
            {urls: ["<all_urls>"]},
            ["responseHeaders", 'extraHeaders']
        );
    } else if (chrome.webRequest.onHeadersReceived.hasListener(cookieMessageFun)){
        // console.log('remove cookieMessage');
        await chrome.webRequest.onHeadersReceived.removeListener(cookieMessageFun);
    }
};

// updateSetting();

chrome.runtime.onMessage.addListener(async(message, sender, sendResponse) => {
    if(message.msgName === 'updateSetting'){
        await updateSetting();
    }
    if(message.msgName === 'babelPlugins'){
        sendResponse(babelPlugins.map((p)=>{return {name:p.name, key:p.key, index:p.index, description:p.description}}));
    }
    return true
});

chrome.runtime.onConnect.addListener(async(port)=>{
    port.onDisconnect.addListener(async()=>{
        if(port.name === 'popupClose'){
            await updateSetting();
        }
    });
});


// 拦截修改
// https://chromedevtools.github.io/devtools-protocol/tot/Fetch/
// https://stackoverflow.com/questions/18310484/modify-http-responses-from-a-chrome-extension

// 响应流转
// https://stackoverflow.com/questions/18534771/chrome-extension-how-to-get-http-response-body

async function respTransfer(url, data) {
    let init = {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    await fetch(url, init);
}

chrome.debugger.onEvent.addListener(async (source, method, params) => {
    // 未暂停请求测试网页:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    // console.log(method);
    try {
        switch (method) {
            case "Fetch.requestPaused":
                try {
                    // console.log(params);
                    if (params.responseStatusCode && params.responseStatusCode >= 300 || !params.request.url.startsWith('http')) {
                        // console.log("continueResponse", params.request.url);
                        await chrome.debugger.sendCommand(source, "Fetch.continueResponse", { requestId: params.requestId });
                        break;
                    }
                    if (params.responseErrorReason) {
                        // console.log("failRequest", params.request.url);
                        await chrome.debugger.sendCommand(source, "Fetch.failRequest", { requestId: params.requestId, errorReason: params.responseErrorReason });
                        break;
                    }
                    if (params.responseStatusCode) {
                        // console.log(params.request.url); // ^https?://
                        let storage = await chrome.storage.local.get({ 'settings': {}, 'respTransferUrl': "", 'respTransfeType': '', 'deobfuscateRules': [] });
                        let resp = await chrome.debugger.sendCommand(source, "Fetch.getResponseBody", { requestId: params.requestId });
                        // 响应流转 针对所有响应类型
                        let resType = {
                            "ALL": ['Document', 'Image', 'Script', 'XHR', 'Fetch'],
                            "DOC": ['Document'],
                            "IMG": ['Image'],
                            "JS": ['Script'],
                            "XHR": ['XHR', 'Fetch'],
                        };
                        if (storage.settings.respTransfer && resType[storage.respTransfeType] && resType[storage.respTransfeType].indexOf(params.resourceType) > -1) {
                            let har = {
                                url: params.request.url,
                                base64Encoded: resp.base64Encoded,
                                type: params.resourceType,
                                body: resp.body
                            }
                            if (storage.respTransferUrl && storage.respTransferUrl.startsWith('http')) respTransfer(storage.respTransferUrl, har)
                        }
                        if (!(storage.settings.traceImprint || storage.settings.deobfuscate)) {
                            await chrome.debugger.sendCommand(source, "Fetch.continueResponse", { requestId: params.requestId });
                            break;
                        }
                        // 反混淆以及变量印记追踪 只针对 js
                        let options = {
                            parserOpts: {
                                errorRecovery: true
                            },
                            generatorOpts: {
                                jsescOption: {
                                    minimal: true
                                }
                            },
                            plugins: [],
                            targets: {
                                chrome: "93"
                            },
                            minified: true
                        };
                        if (storage.settings.deobfuscate) {
                            // 按顺序 优先规则有效
                            for (let r of storage.deobfuscateRules) {
                                if (r.status && new RegExp(r.regexFilter).test(params.request.url)) {
                                    // console.log(r.regexFilter, new RegExp(r.regexFilter));
                                    options.plugins.push(...(babelPlugins.filter((p) => { return r.plugins.indexOf(p.key) > -1 })))
                                    break
                                }
                            }
                        }
                        if (storage.settings.traceImprint) {
                            options.plugins.push(imprintPlugin);
                        }
                        // console.log(params.request.url, options.plugins);
                        let body = resp.body;
                        if (params.resourceType === "Script") {
                            try {
                                // 测试原 js 是否压缩
                                if (resp.base64Encoded) {
                                    body = atob(resp.body);
                                    body = (await babel.transformAsync(body, options)).code;
                                    body = btoa(body);
                                } else {
                                    body = (await babel.transformAsync(body, options)).code;
                                }
                            } catch (e) {
                                console.log(e);
                                body = resp.body;
                            }
                        }
                        await chrome.debugger.sendCommand(source, "Fetch.fulfillRequest", {
                            requestId: params.requestId,
                            responseCode: params.responseStatusCode,
                            responseHeaders: params.responseHeaders,
                            body: body
                        });
                        break;
                    }
                    // console.log("未知拦截响应", params.request.url);
                    await chrome.debugger.sendCommand(source, "Fetch.continueResponse", { requestId: params.requestId });
                    break;
                } catch (error) {
                    console.log(error);
                    await chrome.debugger.sendCommand(source, "Fetch.continueResponse", { requestId: params.requestId });
                }
        }
    } catch (error) {
        console.log(e);
    }

});

// 监听浏览器 debugging cancel
chrome.debugger.onDetach.addListener(async (source, reason)=>{
    // target_closed 关闭 tag 触发，立即触发当前tag关闭，一定延迟后其他tag 全部关闭
    // canceled_by_user 点击 cancel 触发, 立马关闭全部tag
    // console.log(source, reason)
    let storage = await chrome.storage.local.get({ 'settings': {} });
    storage.settings.deobfuscate = false;
    storage.settings.traceImprint = false;
    await chrome.storage.local.set({ 'settings': storage.settings, 'interceptTabId': [] });
});

// chrome.runtime.onStartup.addListener(async()=>{
//     // 每次启动清除 session 级 localStorage
//     console.log('onStartup');
// });

/**
 * 反复启动终止
 * One of the main things to get used to when adopting service workers is that they are short-lived execution environments. 
 * In more practical terms, an extension's service worker will start up, do some work, and get terminated repeatedly throughout a user's browser session. 
 * This poses a challenge to extension developers accustomed to long-lived background pages as application data is not immediately available in global variables.
 */

async function enableInterceptResp(tab) {
    try {
        // console.log('debugging', tab)
        let debugee = { tabId: tab.id };
        await chrome.debugger.attach(debugee, "1.3", async () => {
            if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message);
            } else {
                await chrome.debugger.sendCommand(debugee, "Fetch.enable", {
                    patterns: [
                        {
                            urlPattern: "*",
                            requestStage: "Response",
                            resourceType: "Document"
                        },
                        {
                            urlPattern: "*",
                            requestStage: "Response",
                            resourceType: "Image"
                        },
                        {
                            urlPattern: "*",
                            requestStage: "Response",
                            resourceType: "Script"
                        },
                        {
                            urlPattern: "*",
                            requestStage: "Response",
                            resourceType: "XHR"
                        },
                        {
                            urlPattern: "*",
                            requestStage: "Response",
                            resourceType: "Fetch"
                        }
                    ]
                });
            }
            
        });
    } catch (e) {
        console.log(e)
    }
}

// async function disenableInterceptResp(tab){
//     try {
//         let debugee = { tabId: tab.id };
//         await chrome.debugger.detach(debugee);
//     } catch (e) {
//         console.log(e)
//     }
// }
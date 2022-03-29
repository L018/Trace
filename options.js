/**
 * Copyright (c) 2022 L018. All rights reserved.
 * Licensed under MIT
 */


"use strict";
// theme-switcher
!function() {
    var e = {
        _scheme: "auto",
        change: {
            light: "<i>Turn on dark mode</i>",
            dark: "<i>Turn off dark mode</i>"
        },
        buttonsTarget: ".theme-switcher",
        localStorageKey: "preferedColorScheme",
        init: function() {
            this.scheme = this.schemeFromLocalStorage,
            this.initSwitchers()
        },
        get schemeFromLocalStorage() {
            return void 0 !== window.localStorage && null !== window.localStorage.getItem(this.localStorageKey) ? window.localStorage.getItem(this.localStorageKey) : this._scheme
        },
        get preferedColorScheme() {
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        },
        initSwitchers: function() {
            var t = this;
            document.querySelectorAll(this.buttonsTarget).forEach(function(e) {
                e.addEventListener("click", function() {
                    "dark" == t.scheme ? t.scheme = "light" : t.scheme = "dark"
                }, !1)
            })
        },
        addButton: function(e) {
            var t = document.createElement(e.tag);
            t.className = e.class,
            document.querySelector(e.target).appendChild(t)
        },
        set scheme(e) {
            "auto" == e ? "dark" == this.preferedColorScheme ? this._scheme = "dark" : this._scheme = "light" : "dark" != e && "light" != e || (this._scheme = e),
            this.applyScheme(),
            this.schemeToLocalStorage()
        },
        get scheme() {
            return this._scheme
        },
        applyScheme: function() {
            var i = this;
            document.querySelector("html").setAttribute("data-theme", this.scheme),
            document.querySelectorAll(this.buttonsTarget).forEach(function(e) {
                var t = "dark" == i.scheme ? i.change.dark : i.change.light;
                e.innerHTML = t,
                e.setAttribute("aria-label", t.replace(/<[^>]*>?/gm, ""))
            })
        },
        schemeToLocalStorage() {
            void 0 !== window.localStorage && window.localStorage.setItem(this.localStorageKey, this.scheme)
        }
    };
    e.addButton({
        tag: "BUTTON",
        class: "contrast switcher theme-switcher",
        target: "body"
    }),
    e.init()
}();


// init
let babelPlugins;
// 异步测试未生效，改用 setInterval 实现
chrome.runtime.sendMessage({'msgName': 'babelPlugins'}, (p)=>{babelPlugins = p});
(async ()=>{
    let storage = await chrome.storage.local.get({ 'inject':[] , 'block':{'setRuleIds':[], 'rules':[]}, 'respTransferUrl':'', 'respTransfeType': '', 'deobfuscateRules':[]});
    let jscode = document.querySelector("textarea.inject-code");
    if (storage.inject.length > 0){
        jscode.value = storage.inject[0]['code'];
    }
    // 渲染block
    let rules = storage.block.rules;
    for (let i=0; i<rules.length; i++){
        let template = document.createElement('template');
        template.innerHTML = `<div class="block-item">
        <svg class='block-del' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        <input type="text"/>
        <kbd>get</kbd>
        <input type="checkbox" role="switch"/>
    </div>`
        template.content.lastChild.getElementsByTagName('svg')[0].addEventListener('click',blockDel, false);
        template.content.lastChild.querySelector('input[type="text"]').value = rules[i].regexFilter;
        template.content.lastChild.querySelector('input[type="checkbox"]').checked = rules[i].status;
        document.getElementById('blockItems').appendChild(template.content.lastChild);
    }
    // 渲染 plugins
    let interval = setInterval(()=>{
        if(babelPlugins!==undefined){
            // console.log(babelPlugins);
            let plg = document.querySelector("#babelPlugins")
            for(let p of babelPlugins){
                let ele = document.createElement('kbd');
                ele.innerText = p.name;
                ele.dataset.name = p.name;
                ele.dataset.key = p.key;
                ele.dataset.index = p.index;
                ele.dataset.tooltip = p.description;
                ele.setAttribute("draggable", "true");
                plg.appendChild(ele);
            }
            let deobRules = storage.deobfuscateRules;
            for(let r of deobRules){
                let template = document.createElement('template');
                template.innerHTML = `<div class="deob-item">
    <div>
        <svg class='deob-del' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        <input type="text" placeholder="RegExp"/>
        <input type="checkbox" role="switch"/>
    </div>
    <div class="plugins"></div>
</div>`
                template.content.lastChild.getElementsByTagName('svg')[0].addEventListener('click',deobDel, false);
                template.content.lastChild.addEventListener('dragover', dragoverListener);
                template.content.lastChild.addEventListener('drop', dropListener);
                for(let k of r.plugins){
                    let ele = document.createElement('kbd');
                    let plugin = babelPlugins.filter(p=>{return p.key===k})
                    if(plugin.length===0) break;
                    plugin = plugin[0]
                    ele.innerText = plugin.name;
                    ele.dataset.name = plugin.name;
                    ele.dataset.key = plugin.key;
                    ele.dataset.index = plugin.index;
                    template.content.lastChild.querySelector(".plugins").appendChild(ele);
                }
                template.content.lastChild.querySelector('input[type="text"]').value = r.regexFilter;
                template.content.lastChild.querySelector('input[type="checkbox"]').checked = r.status;
                document.getElementById('deobItems').appendChild(template.content.lastChild);
            }
            clearInterval(interval);
            return
        }
    }, 500);
    // 渲染 transfer
    let transferUrlEle = document.querySelector('input[name="transferUrl"]');
    if(storage.respTransferUrl.length > 0){
        transferUrlEle.value = storage.respTransferUrl
        if(storage.respTransfeType.length>0){
            for(let i of document.querySelector("#respTransfer > select").options){
                if (storage.respTransfeType === i.value){
                    i.selected = true;
                }
            }
        }
    }
})();

// 阻止请求规则添加
document.querySelector("svg.block-add").addEventListener('click', async()=>{
    let template = document.createElement('template');
    template.innerHTML = `<div class="block-item">
    <svg class='block-del' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    <input type="text" placeholder="ASCII RegExp"/>
    <kbd>get</kbd>
    <input type="checkbox" role="switch"/>
</div>`
    template.content.lastChild.getElementsByTagName('svg')[0].addEventListener('click',blockDel, false);
    document.getElementById('blockItems').appendChild(template.content.lastChild);
}, false);

// 阻止请求规则删除
function blockDel(e){
    let target = e.target;
    document.getElementById('blockItems').removeChild(target.closest('.block-item'));
}
// 反混淆规则添加
document.querySelector("svg.deob-add").addEventListener('click', async()=>{
    let template = document.createElement('template');
    template.innerHTML = `<div class="deob-item">
    <div>
        <svg class='deob-del' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        <input type="text" placeholder="RegExp"/>
        <input type="checkbox" role="switch"/>
    </div>
    <div class="plugins"></div>
</div>`
    template.content.lastChild.getElementsByTagName('svg')[0].addEventListener('click',deobDel, false);
    template.content.lastChild.addEventListener('dragover', dragoverListener);
    template.content.lastChild.addEventListener('drop', dropListener);
    document.getElementById('deobItems').appendChild(template.content.lastChild);
}, false);
// 反混淆规则删除
function deobDel(e){
    let target = e.target;
    document.getElementById('deobItems').removeChild(target.closest('.deob-item'));
}

function openMsgBox(target, title, message){
    let modal = document.getElementById(target.getAttribute('data-target'));
    modal.querySelector("h3").innerText = title;
    modal.querySelector("p").innerText = message;
  (typeof(modal) != 'undefined' && modal != null)
    && isModalOpen(modal) ? closeModal(modal) : openModal(modal)
}

document.querySelector("#modal-msg > article > a").addEventListener('click', toggleModal);
document.querySelector("#modal-msg > article > footer > a").addEventListener('click', toggleModal);

// 保存设置
document.querySelector("div.end > button").addEventListener('click', async(event)=>{
    try {
        let storage = await chrome.storage.local.get({ 'block': { 'setRuleIds': [], 'rules': [] } });

        let blockItems = document.querySelectorAll("div.block-item");
        let blockAddRules = [];
        for (let i = 0; i < blockItems.length; i++) {
            let rule = blockItems[i].querySelector('input[type="text"]').value;
            new RegExp(rule);
            if (rule.length > 0) {
                blockAddRules.push(
                    {
                        status: blockItems[i].querySelector('input[type="checkbox"]').checked,
                        regexFilter: rule,
                        requestMethods: ['get'],
                    }
                );
            }
        }

        let inject = [];
        let jscode = document.querySelector("textarea.inject-code");
        if (jscode.value.length > 0) {
            inject = [{ code: jscode.value }];
        }

        let transferUrlEle = document.querySelector('input[name="transferUrl"]');
        let respTransferUrl = '';
        if (new RegExp('^https?://.+').test(transferUrlEle.value)) {
            respTransferUrl = transferUrlEle.value;
        }
        let respTransfeType = document.querySelector("#respTransfer > select").value;

        let deobItems = document.querySelectorAll("div.deob-item");
        let deobAddRules = [];
        for (let i = 0; i < deobItems.length; i++) {
            let rule = deobItems[i].querySelector('input[type="text"]').value;
            new RegExp(rule);
            if (rule.length > 0) {
                deobAddRules.push(
                    {
                        status: deobItems[i].querySelector('input[type="checkbox"]').checked,
                        regexFilter: rule,
                        plugins: Array.from(deobItems[i].querySelector(".plugins").childNodes).filter(k => { return k.tagName === "KBD" }).map(k => { return k.dataset.key }),
                    }
                );
            }
        }
        // console.log(deobAddRules);

        await chrome.storage.local.set({ 'inject': inject, 'block': { 'setRuleIds': storage.block.setRuleIds, 'rules': blockAddRules }, 'respTransferUrl': respTransferUrl, 'respTransfeType': respTransfeType, 'deobfuscateRules': deobAddRules });
        // 只保存不更新
        // alert("保持成功");
        openMsgBox(event.target, '保存成功!', "只保存不更新");
    } catch (error) {
        openMsgBox(event.target, '保存失败!', error.message);
    }
    
}, false)


document.querySelector("#babelPlugins").addEventListener('dragstart', (event)=>{
    // console.log(event.target);
    if(event.target.tagName !== 'KBD'){
        event.dataTransfer.effectAllowed = "none";
        return
    }
    // let ele = document.createElement('kbd');
    // ele.innerHTML = event.target.dataset.name;
    // event.dataTransfer.setDragImage(ele, 10, 10);
    event.dataTransfer.setData("application/json", JSON.stringify(event.target.dataset));
});

function dragoverListener(event){
    if(event.dataTransfer.types.indexOf("application/json") > -1) event.preventDefault(); // 取消默认不允许放置
}

function dropListener(event){
    let plg = event.target.closest('.deob-item').querySelector(".plugins");
    let data = event.dataTransfer.getData("application/json");
    if(!data) return
    data = JSON.parse(data);
    // 暂时不允许重复添加
    for(let k of plg.childNodes){
        if(k.tagName === "KBD" && k.dataset.key === data.key) return
    }
    // console.log(data);
    let ele = document.createElement('kbd');
    ele.innerText = data.name;
    ele.dataset.name = data.name;
    ele.dataset.key = data.key;
    ele.dataset.index = data.index;
    plg.appendChild(ele);
    event.preventDefault(); // 取消默认拖拽效果
}
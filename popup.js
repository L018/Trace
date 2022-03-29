/**
 * Copyright (c) 2022 L018. All rights reserved.
 * Licensed under MIT
 */


var inputsPath = 'div.options > label > input[type=checkbox]';
document.querySelectorAll(inputsPath).forEach(async (input) => {
    let storage = await chrome.storage.local.get({ 'settings': {} });
    if (storage.settings[input.name]) {
        input.checked = true;
    }
    input.addEventListener('change', async(event) => {
        let settings = {};
        for (let i of document.querySelectorAll(inputsPath)) {
            settings[i.name] = i.checked;
        }
        await chrome.storage.local.set({ 'settings': settings });
    })
});

var port = chrome.runtime.connect({name:'popupClose'});
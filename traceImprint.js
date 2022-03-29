/**
 * Copyright (c) 2022 L018. All rights reserved.
 * Licensed under MIT
 */


function t2ImprintLocation() {
    var stack = new Error().stack;
    var ss = stack.split(/\n/);
    try {
        for (var i = 1; i++; i < ss.length) {
            if (ss[i].indexOf("traceImprint.js") === -1 && ss[i].indexOf("<anonymous>") === -1) {
                return ss[i].trim();
            }
        }
    } catch (error) {
    }
    return "Unable to determine location"
}

function t2RecordImprint(anything){
    if (Object.prototype.toString.call(anything) === '[object String]' && anything.length >= 5) {
        let topWindow = window.top;
        topWindow._T2IMPRINTDB = topWindow._T2IMPRINTDB || {};
        if (!topWindow._T2IMPRINTDB[anything]){
            topWindow._T2IMPRINTDB[anything] = t2ImprintLocation();
        }
    }
    return anything
}

// TODO: 优化字符串存储方式，子字符串查找，双向查找
function t2SearchImprint(anything){
    let searchKey = anything + '';
    let topWindow = window.top;
    topWindow._T2IMPRINTDB = topWindow._T2IMPRINTDB || {};
    if (topWindow._T2IMPRINTDB[searchKey]){
        return topWindow._T2IMPRINTDB[searchKey]
    }
    return Object.keys(topWindow._T2IMPRINTDB).filter(key=>{return key.indexOf(searchKey)>-1}).map(key=>{return {key: topWindow._T2IMPRINTDB[key]}})
}
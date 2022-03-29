/**
 * Copyright (c) 2022 L018. All rights reserved.
 * Licensed under MIT
 */


/**
 * BaBel Plugin 插件包
 * 插件定义除原有 name visitor 属性外还需要有
 * key 变量名称
 * description 详细描述
 * index 顺序 数字越大，表示等级越高，执行时越靠后
 */

 import './babel.min.js';
 const babel = Babel.babel;
 const t = babel.types;


class Plugin {
    constructor(property, plugin){
        Object.defineProperties(this,{
            key: {value:property.key, enumerable:false, writable:true},
            description: {value:property.description, enumerable:false, writable:true},
            index: {value:property.index, enumerable:false, writable:true},
        })
        for (let i of Object.keys(plugin)){
            this[i] = plugin[i]
        }
    }
}

/**
 * 变量印记追踪
 */
export let imprintPlugin = new Plugin({
    key: "imprintPlugin",
    description: "t2SearchImprint 变量追踪",
    index: 0,
}, {
    name: "变量印记追踪",
    visitor: {
        // new Function, eval 动态js的
        // ArrowFunctionExpression 没有 arguments 需要单独处理
        "FunctionDeclaration|FunctionExpression|ClassMethod|ClassPrivateMethod|ObjectMethod": function (path) {
            let node = t.expressionStatement(
                t.callExpression(
                    t.memberExpression(
                        t.callExpression(
                            t.memberExpression(
                                t.identifier("Array"),
                                t.identifier("from")
                            ),
                            [t.identifier('arguments')]
                        ),
                        t.identifier("map")
                    ),
                    [t.identifier('t2RecordImprint')]
                )
            );
            path.get('body').unshiftContainer('body', node);
        },
        AssignmentExpression: function (path) {
            if (path.node.operator === '+=') {
                path.node.operator = '=';
                if (t.isBinaryExpression(path.get('right').node)) {
                    let curPath = path.get('right');
                    while (t.isBinaryExpression(curPath.get('left').node)) {
                        curPath = curPath.get('left')
                    }
                    curPath.get('left').replaceWith(t.binaryExpression('+', path.node.left, curPath.node.left))
                }
                else {
                    path.get('right').replaceWith(t.binaryExpression('+', path.node.left, path.node.right))
                }
            }
            if (path.node.operator === '=') {
                path.get('right').replaceWith(t.callExpression(
                    t.identifier('t2RecordImprint'),
                    [path.node.right]
                ));
            }
        },
        BinaryExpression: function (path) {
            if (path.node.operator === '+') {
                path.get('left').replaceWith(t.callExpression(
                    t.identifier('t2RecordImprint'),
                    [path.node.left]
                ));
                path.get('right').replaceWith(t.callExpression(
                    t.identifier('t2RecordImprint'),
                    [path.node.right]
                ));
            }
        },
        VariableDeclarator: function (path) {
            if (path.node.init != null) {
                path.get('init').replaceWith(t.callExpression(
                    t.identifier('t2RecordImprint'),
                    [path.node.init]
                ));
            }
        },
        ReturnStatement: function (path) {
            if (t.isSequenceExpression(path.get('argument').node)) {
                let pathArr = path.get('argument.expressions');
                pathArr[pathArr.length - 1].replaceWith(t.callExpression(
                    t.identifier('t2RecordImprint'),
                    [pathArr[pathArr.length - 1].node]
                ));
            }
            else {
                if (path.node.argument != null) {
                    path.get('argument').replaceWith(t.callExpression(
                        t.identifier('t2RecordImprint'),
                        [path.node.argument]
                    ));
                }
            }
        }
    }
});

/**
 * 去静态 eval
 */


/**
 * 中断转 console
 * debugger
 */
let toConsolePlugin = new Plugin({
    key: "toConsolePlugin",
    description: "debugger 中断操作转为 console 输出",
    index: 0,
}, {
    name: "debugger 转 console",
    visitor: {
        DebuggerStatement: function (path) {
            let node = t.expressionStatement(
                t.callExpression(
                    t.memberExpression(
                        t.identifier("console"),
                        t.identifier("log")
                    ),
                    [t.stringLiteral("debugger")]
                )
            );
            path.replaceWith(node);
        }
    }
});


/**
 * 去三元运算表达式
 * 因无法预测表达式中所有可能，故实现方式暂时转化为多个自执行匿名函数
 * TODO: 优化去重复 function
 */
 let ternaryOperatorPlugin = new Plugin({
    key: "ternaryOperatorPlugin",
    description: "三元运算符转为if-else, 主要用于拆分复杂逻辑，如三元表达式简单，则不建议使用",
    index: 0,
}, {
    name: "去三元运算符",
    visitor: {
        ConditionalExpression: function(path){
            let node = t.callExpression(
                t.functionExpression(
                    null,
                    [],
                    t.blockStatement([
                        t.ifStatement(
                            path.get("test").node,
                            t.blockStatement([t.returnStatement(path.get("consequent").node)]),
                            t.blockStatement([t.returnStatement(path.get("alternate").node)])
                        )
                    ])
                ),
                []
            );
            path.replaceWith(node);
        }
    }
});


/**
 * unescapePlugin
 * 反转义字符，去 \\xNN, \\uNNNN
 * 由 functionPlugin 实现
 * 参考 https://github.com/beautify-web/js-beautify/blob/main/js/src/javascript/tokenizer.js
 */


/**
 * 常量自动运算合并
 * 参考 https://github.com/geeksonsecurity/illuminatejs
 */


export let babelPlugins = [toConsolePlugin, ternaryOperatorPlugin];
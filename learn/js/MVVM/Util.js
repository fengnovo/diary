// 是否元素节点 nodeType === 1
function isElementNode(el) {
    return el.nodeType === 1;
}

// 是否文本节点 nodeType === 3
function isTextNode(el) {
    return el.nodeType === 3;
}

// 是否是f-指令 f-model
function isDirective(name) {
    return name.startsWith('f-');
}
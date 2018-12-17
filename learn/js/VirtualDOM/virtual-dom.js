class Element {
    constructor(type, attr, children) {
        this.type = type;
        this.attr = attr;
        this.children = children;
    }
}

let li1 = new Element('li', {class: 'blue'}, ['li1']);
let li2 = new Element('li', {class: 'yellow'}, ['li1']);
let li3 = new Element('li', {class: 'red'}, ['li1']);
let ul = new Element('ul', {class: 'container'}, [li1, li2, li3]);
let input = new Element('input', {class: 'input-type', type: 'text', value: 2}, []);
let btn = new Element('button', {class: 'input-btn'}, ['确认']);
let div1 = new Element('div', {class: 'inline-container'}, [input, btn]);
let img = new Element('img', {src: 'https://www.baidu.com/img/baidu_jgylogo3.gif'}, []);
let div = new Element('div', {class: 'container'}, [ul, div1, img]);

function setAttr(node, attrName, attrValue) {
    if (attrName === 'value') {
        node.value = attrValue;
    } else {
        node.setAttribute(attrName, attrValue);
    }
}

function render(vdom) {
    if (vdom instanceof Element) {
        let children = vdom.children;
        let v = document.createElement(vdom.type);
        if(vdom.attr) {
            Object.keys(vdom.attr).forEach(attr => {
                setAttr(v, [attr], vdom.attr[attr]);
            });
        }
        children.forEach(node => {
            v.appendChild(render(node));
        });
        return v;
    } else {
        return document.createTextNode(vdom);
    }
    
}
let ULL = render(div);
console.log(ULL);
document.querySelector('#app').appendChild(ULL);


/**
 {
     type: 'ul', attr: {

     }, clildren: []
 }
 */
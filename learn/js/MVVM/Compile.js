class Compile {
    constructor(el, vm) {
        this.$el = isElementNode(el) ? el : document.querySelector(el);
        this.$vm = vm;
        this.compile(this.$vm, this.$el);
    }
    compile(vm, el) {
        let fragment = document.createDocumentFragment();
        // 将app节点下的节点转移到内存中
        let firstChild;
        while (firstChild = el.firstChild) {
            fragment.appendChild(firstChild);
        }
        // 对app节点下的模版进行编译
        this.compileNode(fragment);
        // console.log(fragment);
        this.$el.appendChild(fragment);
    }
    compileNode(fragment) {
        // 取出fragment里的节点
        let nodes = fragment.childNodes;
        // 编译文档中的{{}}和f-model
        Array.from(nodes).forEach(node => {
            if (isElementNode(node)) {
                this.compileElementNode(node);
                this.compileNode(node);
            }
            if (isTextNode(node)) {
                this.compileTextNode(node);
            }

        });

    }
    compileElementNode(node) {
        // 取元素节点的属性
        let attrs = node.attributes;
        Array.from(attrs).forEach(attr => {
            // 替换节点属性中的指令 f-model="person.name"
            if (isDirective(attr.name)) {
                let expr = attr.value;
                let attrName = attr.name.slice(2);
                // node vm.data expr ---> 分别是： 节点，实例里data，要取data里对应的哪些属性
                CompileUtil[attrName](node, this.$vm, expr);
            }
        });
    }
    compileTextNode(node) {
        // 取文本节点的内容，替换{{}}
        let expr = node.textContent.trim();
        if (expr) {
            let reg = /\{\{([^}]+?)\}\}/g;
            if (reg.test(expr)) {
                CompileUtil['text'](node, this.$vm, expr);
            }
        }
    }
}

CompileUtil = {
    getVal(data, expr) {
        // 将 person.name 从vm的data中取出对应的值
        return expr = expr.trim().split('.').reduce((perv, next) => {
            return perv[next];
        }, data);
    },
    getTextVal(data, expr) {
        return expr.trim().replace(/\{\{([^}]+?)\}\}/g, (...args) => {
            // args第一个参数是{{person.name}} ,第二个参数是 person.name  ----> 所以要args[1]
            return this.getVal(data, args[1]);
        });
    },
    setVal(vm, expr, newValue){
        expr = expr.trim().split('.');
        expr.reduce((prev, next, index) => {
            if (index === (expr.length - 1)) {
                prev[next] = newValue;
            }
            return prev[next];
        }, vm.$data);
    },
    text(node, vm, expr) {
        let value = this.getTextVal(vm.$data, expr);
        expr.replace(/\{\{([^}]+?)\}\}/g, (...args) => {
            new Watcher(vm, args[1], (newValue) => {
                this.updater['textUpdater'](node, this.getTextVal(vm.$data, expr));
            });
        });
        this.updater['textUpdater'](node, value);
    },
    model(node, vm, expr) {
        new Watcher(vm, expr, (newValue) => {
            this.updater['modelUpdater'](node, this.getVal(vm.$data, expr));
        });
        // model 一定要监听输入
        node.addEventListener('input', (e) => {
            let newValue = e.target.value;
            this.setVal(vm, expr, newValue);
        });
        this.updater['modelUpdater'](node, this.getVal(vm.$data, expr));
    },
    updater: {
        // 对应更新节点的内容或值
        textUpdater(node, value) {
            node.textContent = value;
        },
        modelUpdater(node, value) {
            node.value = value;
        }
    }
}
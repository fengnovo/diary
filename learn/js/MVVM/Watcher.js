class Watcher {
    constructor(vm, expr, cb) {
        this.$vm = vm;
        this.expr = expr;
        this.cb = cb;
        // 一上来先取得老值
        this.value = this.get();
    }
    get() {
        Dep.target = this.cb; // ----> 通过person.name取的时候有用
        let value = this.expr.trim().split('.').reduce((prev, next) => {
            return prev[next];
        }, this.$vm.$data);
        Dep.target = null;
        return value;
    }
    update() {
        let newValue = this.get();
        let oldValue = this.value;
        if (newValue != oldValue) {
            this.cb(newValue, oldValue);
        }
    }
}

/**
 * 一 watch时，对比新值和老值
 * 
 * watch: {
 *      'proson.name'(newVal, oldValue) {
 *             ....
 *      }
 * }
 */
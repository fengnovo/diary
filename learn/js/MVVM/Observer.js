class Observer {
    constructor(data) {
        this.observer(data);
    }
    /**
     * 将实例中data逐一换成响应式的对象，数据劫持
     */
    observer(data) {
        if (typeof data === 'object' && data) {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key]);
            });
            // console.log(data);
        }
    }
    defineReactive(data, key, value) {
        let _this = this;
        let dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                let watcher = Dep.target;
                watcher && dep.addSub(watcher); // 取得时候增加监听
                return value; // ---> 不能data[key] ---> 调用get() 会旋进死循环
            },
            set(newValue) {
                if (value != newValue) {
                    _this.observer(value); // this已经不是Observer实例了
                    value = newValue;
                    // 设置值的时候，触发发布订阅的watcher(事件)
                    dep.notify();
                }
            }
        });
        this.observer(value);
    }
}

// 观察者模式（发布订阅）
class Dep{
    constructor() {
        this.subs = [];
    }
    // 订阅事件
    addSub(watcher) {
        this.subs.push(watcher);
    }
    // 发布事件
    notify() {
        this.subs.forEach(sub => sub());
    }
}
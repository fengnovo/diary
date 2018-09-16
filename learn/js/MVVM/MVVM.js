class MVVM {
    constructor(opt) {
        this.$el = opt.el;
        this.$data = opt.data;
        this.init();
    }
    init() {
        if (this.$el) {
            // 数据劫持
            new Observer(this.$data);
            // 数据代理
            proxyData(this, this.$data);
            // 模版编译
            new Compile(this.$el, this);
        }
    }
}
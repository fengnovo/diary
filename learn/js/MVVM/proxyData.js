function proxyData(vm, data) {
    Object.keys(data).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return data[key];
            },
            set(newValue) {
                data[key] = newValue;
            }
        });
    });
}
#### 微任务

`MutationObserver` `MessageChannel`

```js
function asyncCallByMutationObserver(callback) {
    const div = document.createElement('div')
    let count = 0
    const observer = new MutationObserver(() => {
        callback && typeof callback === 'function' && callback.call(null)
    })

    observer.observe(div, { attributes: true })
    div.setAttribute('count', ++count);
}
function asyncCallByMessageChannel(callback) {
    const ch = new MessageChannel()
    ch.port1.onmessage = callback
    ch.port2.postMessage(1)
}
setTimeout(() => {
    console.log(1)
}, 0)
new Promise((resolve) => {
    console.log(2)
    for(let i = 0; i < 100000; i++) {
        (i === 99999) && resolve()
    }
    console.log(3)
}).then(() => {
    console.log(4)
})

console.log(5);

asyncCallByMessageChannel(() => {
    console.log(8)
});
asyncCallByMutationObserver(() => {
    console.log(6)
});
console.log(7);
// 2 3 5 7 4 6 8 1
```


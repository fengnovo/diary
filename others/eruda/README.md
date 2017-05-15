## eruda调试  
https://github.com/liriliri/eruda   

```bash
npm install eruda --save
```    


```
<script src="node_modules/eruda/eruda.min.js"></script>
<script>eruda.init();</script>
```


```
<script src="//cdn.jsdelivr.net/eruda/1.2.2/eruda.min.js"></script>
<script>eruda.init();</script>
```



```javascript
var el = document.createElement('div');
document.body.appendChild(el);

eruda.init({
    container: el,
    tool: ['console', 'elements']
});
```
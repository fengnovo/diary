### npx  
```  
npx webpack --mode development
```  

### Node.js 命令行 (http://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html)

首先，使用 JavaScript 语言，写一个可执行脚本 fengpack，没有.js 。
```
#!/usr/bin/env node
console.log('fengpack!!!!');
```
然后，修改 fengpack 的权限。

```
$ chmod 755 fengpack
```
现在，fengpack 就可以执行了。
```
$ ./fengpack
```
fengpack!!!!
如果想把 fengpack 前面的路径去除，可以将 fengpack 的路径加入环境变量 PATH。但是，另一种更好的做法，是在当前目录下新建 package.json ，写入下面的内容。

```
{
  "name": "fengpack",
  "bin": {
    "fengpack": "fengpack"
  }
}
```
然后执行 npm link 命令。

```
$ npm link
```
现在再执行 fengpack ，就不用输入路径了。

```
$ fengpack
```
fengpack!!!!
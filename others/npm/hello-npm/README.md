# 用npm发布一个npm包   
1.新建一个目录hello-npm，这是要发布包的放的目录（不是包的名称）。

2.hello-npm目录下新建hello-fengnovo.js，这是要发布npm包的名称。
```  
exports.Hello = function ( name ) {  
    console.log( "Hello " + name );  
}  
```

3.运行npm init, Package name要为发布的npm包的名称  
```  
npm init  
```

4.返回到hello-npm目录的同级目录, 这时运行 npm install hello-npm/  就可以 安装刚才hello-fengnovo包  
```
feng:others nian$ npm install hello-npm/
/Users/tusm
└── hello-fengnovo@1.0.0  
```

5.运行node命令，就可以直接使用Hello方法  
```
node 
> var Hello = require('hello-fengnovo').Hello
undefined
> Hello('sdvsd')
Hello sdvsd
undefined
```

6.用npm adduser添加npm用户，这样可以发布到npm.org上  
```
$ npm adduser
Username: fengnovo
Password: 
Email: (this IS public) fengnoku@126.com
```

7.用 npm publish hello-npm/ 发布  
```
$ npm publish hello-npm/
+ hello-fengnovo@1.0.0  
```

8.登录https://www.npmjs.com/~fengnovo 可以看到自己刚发布的npm包

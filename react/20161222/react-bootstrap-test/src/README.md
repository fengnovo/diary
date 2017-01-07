# 广发资讯运营平台后台管理系统

正式版本的后台管理平台，分为“资讯管理”、“草稿管理”、“栏目管理（精选资讯也合入）”、“举报管理”、“权限管理”等模块。数据大部分来自贝格、新浪等外部平台，但也可以在本平台新建广发自有的资讯。

## Get the code

```
$ git clone http://gitlab.gf.com.cn/information/information-cms.git
```

## Installation

Install all dependencies. 

```
$ npm install
```


## Development

Builds the application and starts a webserver with livereload. The only thing you need to do is to run command `$ gulp` or `$ npm start`.

```
$ npm start 
```

## Build

Builds a minified version of the application in the dist folder.

```
$ gulp build --pub
```

## Javascript

Javascript entry file: `src/scripts/main.js` <br />

**Reflux**

We are using Reflux, which is an implemantion of the [Flux Architecture](http://facebook.github.io/flux/docs/overview.html). If you want to read more about Reflux, check out the readme of the [reflux git repo](https://github.com/spoike/refluxjs). 

**React-Router**

The routing is done with the [react-router](https://github.com/rackt/react-router). It's especially great for SPA's. We would recommend to read the [guide](https://github.com/rackt/react-router/blob/master/docs/guides/overview.md) to get an overview of the router features.

**ES6 with babel**

We are working with the webpack [babel loader](https://github.com/babel/babel-loader) in order to load our .js/.jsx files. Babel allows you to use ES6 features like class, arrow functions and [much more](https://babeljs.io/docs/compare/).



## CSS

CSS entry file: `src/css/main.scss`<br />

**SCSS**

As you can see we are using stylus to preprocess our .scss files. If you didn't work with a css preprocessor before the [stylus page](http://learnboost.github.io/stylus/) is a good starting point to get to know what stylus can do for you.<br /><br />
If you want to use third-party CSS you just include it via `@import 'path/to/your/third-party-styles.css'` at the top of the main.scss file.


## Webpack Hints

You can find the webpack configuration in the [webpack.config.js file](./webpack.config.js).
We use the babel-loader in order to load .jsx and .js files via webpack. If it's possible install all your dependencies with NPM. Packages installed with NPM can be used like this:

```language-javascript

var moduleXYZ = require('moduleXYZ');

```
You can find all loaders in this [list](http://webpack.github.io/docs/list-of-loaders.html).


###Requirements
* node
* npm
* gulp
# Airbnb React/JSX 编码规范

取自：http://www.runoob.com/w3cnote/google-css-style-guide.html  

## CSS代码风格规则

### CSS代码有效性  
#### 尽量使用有效的CSS代码。  
使用有效的CSS代码，除非是处理CSS校验器程序错误或者需要专有语法。  
用类似W3C CSS validator 这样的工具来进行有效性的测试。  
使用有效的CSS是重要的质量衡量标准，如果发现有的CSS代码没有任何效果的可以删除，确保CSS用法适当。  
#### ID和class的命名  
为ID和class取通用且有意义的名字。  
应该从ID和class的名字上就能看出这元素是干嘛用的，而不是表象或模糊不清的命名。  
应该优先虑以这元素具体目来进行命名，这样他就最容易理解，减少更新。  
通用名称可以加在兄弟元素都不特殊或没有个别意义的元素上，可以起名类似"helpers"这样的泛。  
使用功能性或通用的名字会减少不必要的文档或模板修改。  

    ```
    /* 不推荐: 无意义 不易理解 */  
    #yee-1901 {}  
    /* 不推荐: 表达不具体 */
    .button-green {}
    .clear {}
    /* 推荐: 明确详细 */
    #gallery {}
    #login {}
    .video {}  
    /* 推荐: 通用 */
    .aux {}  
    .alt {}
    ```

    
### ID和class命名风格
非必要的情况下，ID和class的名称应尽量简短。  
简要传达ID或class是关于什么的。  
通过这种方式，似的代码易懂且高效。  

    ```
    /* 不推荐 */
    #navigation {}
    .atr {}
    /* 推荐 */
    #nav {}
    .author {}
    ```

### 类型选择器
避免使用CSS类型选择器。  
非必要的情况下不要使用元素标签名和ID或class进行组合。  
出于性能上的考虑避免使用父辈节点做选择器 performance reasons.  

    ```
    /* 不推荐 */
    ul#example {}
    div.error {}
    /* 推荐 */
    #example {}
    .error {}
    ```

### 属性缩写  
写属性值的时候尽量使用缩写。  
CSS很多属性都支持缩写shorthand （例如 font ） 尽量使用缩写，甚至只设置一个值。  
使用缩写可以提高代码的效率和方便理解。  
0和单位  
非必要的情况下 0 后面不用加单位。  
  
    ```
    margin: 0;
    padding: 0;
    ```

### 0开头的小数  
省略0开头小数点前面的0。  
值或长度在-1与1之间的小数，小数前的 0 可以忽略不写。  

    ```
    font-size: .8em;
    ```

### URI外的引号
省略URI外的引号。  
不要在 url() 里用 ( "" , '' ) 。  
十六进制  
十六进制尽可能使用3个字符。  
加颜色值时候会用到它，使用3个字符的十六进制更短与简洁。  

    ```
    /* 不推荐 */
    color: #eebbcc;
    /* 推荐 */
    color: #ebc;
    ```

### 前缀  
选择器前面加上特殊应用标识的前缀（可选）。  
大型项目中最好在ID或class名字前加上这种标识性前缀（命名空间），使用短破折号链接。  
使用命名空间可以防止命名冲突，方便维护，比如在搜索和替换操作上。  
ID和class命名的定界符  
ID和class名字有多单词组合的用短破折号"-"分开。  
别在选择器名字里用短破折号"-"以外的连接词(包括啥也没有)， 以增进对名字的理解和查找。  

    ```
    /* 不推荐：“demo”和“image”中间没加“-” */
    .demoimage {}
    /* 不推荐：用下划线“_”是屌丝的风格 */
    .error_status {}
    /* 推荐 */
    #video-id {}
    .ads-sample {}
    ```

### Hacks
最好避免使用该死的CSS "hacks" —— 请先尝试使用其他的解决方法。  
虽然它很有诱惑力，可以当作用户代理检测或特殊的CSS过滤器，但它的行为太过于频繁，会长期伤害项目的效率和代码管理，所以能用其他的解决方案就找其他的。  


## CSS代码格式规则

### 声明顺序
依字母顺序进行声明。  
都按字母顺序声明，很容易记住和维护。  
忽略浏览器的特定前缀排序，但多浏览器特定的某个CSS属性前缀应相对保持排序（例如-moz前缀在-webkit前面）。  

    ```
    background: fuchsia;
    border: 1px solid;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    color: black;
    text-align: center;
    text-indent: 2em;
    ```

### 代码块内容缩进

缩进所有代码块（"{}"之间）内容。  
缩进所有代码块的内容，它能够提高层次结构的清晰度。  
声明完结  
所有声明都要用";"结尾。  
考虑到一致性和拓展性，请在每个声明尾部都加上分号。  

    ```jsx
    /* 不推荐 */
    .test {
      display: block;
      height: 100px
    }
    /* 推荐 */
    .test {
      display: block;
      height: 100px;
    }
    ```

### 属性名完结
在属性名冒号结束后加一个空字符。  
出于一致性的原因，在属性名和值之间加一个空格（可不是属性名和冒号之间噢）。  

    ```jsx
    /* 不推荐 */
    h3 {
      font-weight:bold;
    }
    /* 推荐 */
    h3 {
      font-weight: bold;
    }
    ```

### 选择器和声明分行
将选择器和声明隔行。  
每个选择器和声明都要独立新行。  

    ```
    /* 不推荐 */
    a:focus, a:active {
      position: relative; top: 1px;
    }
    /* 推荐 */
    h1,
    h2,
    h3 {
      font-weight: normal;
      line-height: 1.2;
    }
    ```

### 规则分行
每个规则独立一行。  
两个规则之间隔行。  

    ```
    html {
      background: #fff;
    }
    body {
      margin: auto;
      width: 50%;
    }
    ```

## CSS元数据规则

### 注释部分
按组写注释。（可选）  
如果可以，按照功能的类别来对一组样式表写统一注释。独立成行。 

    ```
    /* Header */
    #adw-header {}
    /* Footer */
    #adw-footer {}
    /* Gallery */
    .adw-gallery {}
    ```

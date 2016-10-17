# 前端一像素样式
演示地址：http://htmlpreview.github.io/?https://github.com/fengnovo/diary/blob/master/react/20161017/a.html  

  
参考博客
``` 
position: relative;

.t:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    -webkit-transform: scale(1,.5);
    transform: scale(1,.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    content: '';
    border-top: 1px solid #ddd;
}  
...

```
(function(){
    /**
     ** http://getfirebug.com/wiki/index.php/Console.log
     ** console格式化字符串
     ** 
     ** Pattern  Type
     ** %s       String
     ** %d, %i   Integer (numeric formatting is not yet supported)
     ** %f/%.xf  Floating point number; x denotes the number of decimal places the number should be rounded to (if ommitted, the number won't be rounded)
     ** %o       Object hyperlink
     ** %c       Style formatting 
     **/

    if(window.console){

        console.info(
            '%c' + [
                ''
                , '我想找个好公司'
                , '有谁知道？'
            ].join("\n")
            , [
                'font-size:14px'
                , 'line-height:28px'
                , 'color: #0064b0'
            ].join(';')
        );

        console.log(
            [
                '%c欢迎issue：\n'
                , '%o'
            ].join("")
            , [
                'font-size:14px'
                , 'line-height:28px'
                , 'color: #000'
            ].join(';')
        );

        console.log(
            '%c我是"黄云峰"'
            , [
                'font-size:14px'
                , 'line-height:28px'
                , 'color: #f00'
            ].join(';')
        );

        console.log(
            '%c我是一介码农%o'
            , [
                'font-size:18px'
                , 'font-weight:bold'
                , 'line-height:30px'
                , 'color: #0064b0'
            ].join(';')
            , 'https://github.com/fengnovo'
        );

    }
})();
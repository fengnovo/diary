import React from 'react'

class B extends React.Component {
    constructor(props) {
        super(props)
    }
    handleClick () {
         console.log('离开---'+this.props.transitionL);
         console.log('进入---'+this.props.transitionE);
        this.props.changeLive();
        history.back();
    }

    render () {
        return(<div className="detail">
        <div className="nav"><span className="nav-back" onClick={ () => this.handleClick() }> 《 返回</span></div>
        <div className="content">
        <p>
            CSS中的ul与li样式详解

ul和li列表是使用CSS布局页面时常用的元素。在CSS中，有专门控制列表表现的属性，常用的有list-style-type属性、list-style-image属性、list-style-position属性和list-style属性。
　　一、list-style-type属性
　　list-style-type属性是用来定义li列表的项目符号的，即列表前面的修饰。list-style-type属性是一个可继承的属性。其语法结构如下：（列举一些常用的属性值）
        
        
        </p>
        <p>
        list-style-type:none/disc/circle/square/demical/lower-alpha/upper-alpha/lower-roman/upper-roman
　　      list-style-type属性的属性值有很多，在这里我们只是列举了比较常用的几个。
        none：不使用项目符号。 disc：实心圆。 circle：空心圆。 square：实心方块。 demical：阿拉伯数字。 lower-alpha：小写英文字母。 upper-alpha：大写英文字母。 lower-roman：小写罗马数字。 upper-roman：大写罗马数字。

        </p>
        <p>
            二、list-style-image属性
            　　list-style-image属性用来定义使用图片代替项目符号。它也是一个可继承属性，其语法结构如下：
            　　list-style-image:none/url
            　　list-style-image属性可以取两个值：
                none：没有替换的图片。 url：要替换图片的路径。
        </p>

        <p>
        三、list-style-position属性
        　　list-style-position属性，是用来定义项目符号在列表中显示位置的属性。它同样是一个可继承的属性，语法结构如下：
        　　list-style-position:inside/outside
            inside：项目符号放置在文本以内。 outside：项目符号放置在文本以外。
        </p>
        
        <p>
       四、list-style属性
        　　list-style属性是综合设置li样式的属性，也是一个可以继承的属性，语法结构如下：
        　　li-style:list-style-type/list-style-image/list-style-position
        　　各个值的位置可以交换。
        </p>
        </div>
        </div>);
    }
}

export default B
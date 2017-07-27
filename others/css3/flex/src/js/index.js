import React from 'react'
import { render } from 'react-dom'

let rootElement = document.getElementById('app')

render(
    <div className="wrapper">
        <header className="header">标题</header>
            <article className="main">
                <p>flex: 0 auto,flex: initial与flex: 0 1 auto相同。（这也就是初始值。）<br />
                根据width／height属性决定元素的尺寸。（如果项目的主轴长度属性的计算值为auto，<br />
                则会根据其内容来决定元素尺寸。）当剩余空间为正值时，伸缩项目无法伸缩，但当空间不足时，<br />
                伸缩项目可收缩至其最小值。网页作者可以用对齐相关的属性以及margin属性的auto值控制伸缩项目沿着主轴的对齐方式。<br />
                flex: auto与flex: 1 1 auto相同。根据width／height属性决定元素的尺寸，<br />
                但是完全可以伸缩，会吸收主轴上剩下的空间。如果所有项目均为flex: auto、flex: initial或flex: none，<br />
                则在项目尺寸决定后，剩余的正空间会被平分给是flex: auto的项目。<br />
                flex: none与flex: 0 0 auto相同。根据width／height属性决定元素的尺寸，<br />
                但是完全不可伸缩。其效果与initial类似，但即使在空间不够而溢出的情况下，伸缩项目也不能收缩。<br />
                flex: 与flex: 1 0px相同。该值使元素可伸缩，并将伸缩基准值设置为零，<br />
                导致该项目会根据设置的比率占用伸缩容器的剩余空间。如果一个伸缩容器里的所有项目都使用此模式，<br />
                则它们的尺寸会正比于指定的伸缩比率。<br />
                默认状态下，伸缩项目不会收缩至比其最小内容尺寸（最长的英文词或是固定尺寸元素的长度）更小。<br />
                网页作者可以靠设置min-width或min-height属性来改变这个默认状态。（参见《伸缩项目的默认最小长度》。）<br />
                </p>  
            </article>
            <aside className="aside aside-1">左侧</aside>
            <aside className="aside aside-2">右侧</aside>
        <footer className="footer">底部</footer>
    </div>,
    rootElement
)


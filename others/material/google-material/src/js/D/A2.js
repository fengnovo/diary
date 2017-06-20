import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './../../css/test/D.css'
import aboutHeader from './../../imgs/D/images/about-header.jpg' 

class A2 extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header mdl-layout__header--waterfall portfolio-header">
                    <div className="mdl-layout__header-row portfolio-logo-row">
                        <span className="mdl-layout__title">
                            <div className="portfolio-logo"></div>
                            <span className="mdl-layout__title">Simple portfolio website</span>
                        </span>
                    </div>
                    <div className="mdl-layout__header-row portfolio-navigation-row mdl-layout--large-screen-only">
                        <nav className="mdl-navigation mdl-typography--body-1-force-preferred-font">
                            <Link className="mdl-navigation__link" to={"/D1"}>Portfolio</Link>
                            <Link className="mdl-navigation__link is-active" to={"/D2"}>Blog</Link>
                            <Link className="mdl-navigation__link" to={"/D3"} >About</Link>
                            <Link className="mdl-navigation__link" to={"/D4"} >Contact</Link>
                        </nav>
                    </div>
                </header>
                <div className="mdl-layout__drawer mdl-layout--small-screen-only">
                    <nav className="mdl-navigation mdl-typography--body-1-force-preferred-font">
                        <Link className="mdl-navigation__link" to={"/D1"}>Portfolio</Link>
                            <Link className="mdl-navigation__link  is-active" to={"/D2"}>Blog</Link>
                            <Link className="mdl-navigation__link" to={"/D3"} >About</Link>
                            <Link className="mdl-navigation__link" to={"/D4"} >Contact</Link>
                    </nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="mdl-grid portfolio-max-width">

                        <div className="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp">
                            <div className="mdl-card__title">
                                <h2 className="mdl-card__title-text">About</h2>
                            </div>
                            <div className="mdl-card__media">
                                <img className="article-image" src={aboutHeader}  alt="" />
                            </div>

                            <div className="mdl-grid portfolio-copy">
                                <h3 className="mdl-cell mdl-cell--12-col mdl-typography--headline">Introduction</h3>
                                <div className="mdl-cell mdl-cell--8-col mdl-card__supporting-text no-padding ">
                                    <p>
                                        Excepteur reprehenderit sint exercitation ipsum consequat qui sit id velit elit. Velit anim eiusmod labore sit amet. Voluptate voluptate irure occaecat deserunt incididunt esse in. Sunt velit aliquip sunt elit ex nulla reprehenderit qui ut eiusmod ipsum do. Duis veniam reprehenderit laborum occaecat id proident nulla veniam. Duis enim deserunt voluptate aute veniam sint pariatur exercitation. Irure mollit est sit labore est deserunt pariatur duis aute laboris cupidatat. Consectetur consequat esse est sit veniam adipisicing ipsum enim irure.
                                    </p>
                                </div>
                                <h3 className="mdl-cell mdl-cell--12-col mdl-typography--headline">Irure mollit est sit labore</h3>
                                <div className="mdl-cell mdl-cell--8-col mdl-card__supporting-text no-padding ">
                                    <p>
                                        Excepteur reprehenderit sint exercitation ipsum consequat qui sit id velit elit. Velit anim eiusmod labore sit amet. Voluptate voluptate irure occaecat deserunt incididunt esse in. Sunt velit aliquip sunt elit ex nulla reprehenderit qui ut eiusmod ipsum do. Duis veniam reprehenderit laborum occaecat id proident nulla veniam. Duis enim deserunt voluptate aute veniam sint pariatur exercitation. Irure mollit est sit labore est deserunt pariatur duis aute laboris cupidatat. Consectetur consequat esse est sit veniam adipisicing ipsum enim irure.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="mdl-mini-footer">
                        <div className="mdl-mini-footer__left-section">
                            <div className="mdl-logo">Simple portfolio website</div>
                        </div>
                        <div className="mdl-mini-footer__right-section">
                            <ul className="mdl-mini-footer__link-list">
                                <li><a href="#">Help</a></li>
                                <li><a href="#">Privacy & Terms</a></li>
                            </ul>
                        </div>
                    </footer>
                </main>
            </div>
        )
    }
}

export default A2;
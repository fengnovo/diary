import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './../../css/test/D.css'
import contactImage from './../../imgs/D/images/contact-image.jpg' 

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
                            <Link className="mdl-navigation__link" to={"/D2"}>Blog</Link>
                            <Link className="mdl-navigation__link" to={"/D3"} >About</Link>
                            <Link className="mdl-navigation__link is-active" to={"/D4"} >Contact</Link>
                        </nav>
                    </div>
                </header>
                <div className="mdl-layout__drawer mdl-layout--small-screen-only">
                    <nav className="mdl-navigation mdl-typography--body-1-force-preferred-font">
                        <Link className="mdl-navigation__link" to={"/D1"}>Portfolio</Link>
                        <Link className="mdl-navigation__link" to={"/D2"}>Blog</Link>
                        <Link className="mdl-navigation__link" to={"/D3"} >About</Link>
                        <Link className="mdl-navigation__link is-active" to={"/D4"} >Contact</Link>
                    </nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="mdl-grid portfolio-max-width portfolio-contact">
                        <div className="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp">
                            <div className="mdl-card__title">
                                <h2 className="mdl-card__title-text">Contact</h2>
                            </div>
                            <div className="mdl-card__media">
                                <img className="article-image" src={contactImage}  alt="" />
                            </div>
                            <div className="mdl-card__supporting-text">
                                <p>
                                    Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
                                </p>
                                <p>
                                    Excepteur reprehenderit sint exercitation ipsum consequat qui sit id velit elit. Velit anim eiusmod labore sit amet.
                                </p>
                                <form action="#" className="">
                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <input className="mdl-textfield__input" pattern="[A-Z,a-z, ]*" type="text" id="Name" />
                                        <label className="mdl-textfield__label" htmlFor="Name">Name...</label>
                                        <span className="mdl-textfield__error">Letters and spaces only</span>
                                    </div>
                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <input className="mdl-textfield__input" type="text" id="Email" />
                                        <label className="mdl-textfield__label" htmlFor="Email">Email...</label>
                                    </div>
                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <textarea className="mdl-textfield__input" type="text" rows="5" id="note"></textarea>
                                        <label className="mdl-textfield__label" htmlFor="note">Enter note</label>
                                    </div>
                                    <p>
                                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit">
                                            Submit
                                        </button>
                                    </p>
                                </form>
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
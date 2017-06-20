import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './../../css/test/A.css'
import co1 from './../../imgs/A/images/co1.jpg' 
import co2 from './../../imgs/A/images/co2.jpg' 

class A2 extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="demo-blog demo-blog--blogpost mdl-layout mdl-js-layout has-drawer is-upgraded">
                    <main className="mdl-layout__content">
                        <div className="demo-back">
                            <Link to={"/A1"} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" title="go back" role="button">
                                <i className="material-icons" role="presentation">arrow_back</i>
                            </Link>
                        </div>
                        <div className="demo-blog__posts mdl-grid">
                            <div className="mdl-card mdl-shadow--4dp mdl-cell mdl-cell--12-col">
                                <div className="mdl-card__media mdl-color-text--grey-50">
                                    <h3>On the road again</h3>
                                </div>
                                <div className="mdl-color-text--grey-700 mdl-card__supporting-text meta">
                                    <div className="minilogo"></div>
                                    <div>
                                        <strong>The Newist</strong>
                                        <span>2 days ago</span>
                                    </div>
                                    <div className="section-spacer"></div>
                                    <div className="meta__favorites">
                                        425 <i className="material-icons" role="presentation">favorite</i>
                                        <span className="visuallyhidden">favorites</span>
                                    </div>
                                    <div>
                                        <i className="material-icons" role="presentation">bookmark</i>
                                        <span className="visuallyhidden">bookmark</span>
                                    </div>
                                    <div>
                                        <i className="material-icons" role="presentation">share</i>
                                        <span className="visuallyhidden">share</span>
                                    </div>
                                </div>
                                <div className="mdl-color-text--grey-700 mdl-card__supporting-text">
                                    <p>
                                        Excepteur reprehenderit sint exercitation ipsum consequat qui sit id velit elit. Velit anim eiusmod labore sit amet. Voluptate
                                        voluptate irure occaecat deserunt incididunt esse in. Sunt velit aliquip sunt elit ex nulla reprehenderit
                                        qui ut eiusmod ipsum do. Duis veniam reprehenderit laborum occaecat id proident nulla veniam.
                                        Duis enim deserunt voluptate aute veniam sint pariatur exercitation. Irure mollit est sit labore
                                        est deserunt pariatur duis aute laboris cupidatat. Consectetur consequat esse est sit veniam
                                        adipisicing ipsum enim irure.
                                    </p>
                                    <p>
                                        Qui ullamco consectetur aute fugiat officia ullamco proident Lorem ad irure. Sint eu ut consectetur ut esse veniam laboris
                                        adipisicing aliquip minim anim labore commodo. Incididunt eu enim enim ipsum Lorem commodo tempor
                                        duis eu ullamco tempor elit occaecat sit. Culpa eu sit voluptate ullamco ad irure. Anim commodo
                                        aliquip cillum ea nostrud commodo id culpa eu irure ut proident. Incididunt cillum excepteur
                                        incididunt mollit exercitation fugiat in. Magna irure laborum amet non ullamco aliqua eu. Aliquip
                                        adipisicing dolore irure culpa aute enim. Ullamco quis eiusmod ipsum laboris quis qui.
                                    </p>
                                    <p>
                                        Cillum ullamco eu cupidatat excepteur Lorem minim sint quis officia irure irure sint fugiat nostrud. Pariatur Lorem irure
                                        excepteur Lorem non irure ea fugiat adipisicing esse nisi ullamco proident sint. Consectetur
                                        qui quis cillum occaecat ullamco veniam et Lorem cupidatat pariatur. Labore officia ex aliqua
                                        et occaecat velit dolor deserunt minim velit mollit irure. Cillum cupidatat enim officia non
                                        velit officia labore. Ut esse nisi voluptate et deserunt enim laborum qui magna sint sunt cillum.
                                        Id exercitation labore sint ea labore adipisicing deserunt enim commodo consectetur reprehenderit
                                        enim. Est anim nostrud quis non fugiat duis cillum. Aliquip enim officia ad commodo id.
                                    </p>
                                </div>
                                <div className="mdl-color-text--primary-contrast mdl-card__supporting-text comments">
                                    <form>
                                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                            <textarea rows='1' className="mdl-textfield__input" id="comment"></textarea>
                                            <label htmlFor="comment" className="mdl-textfield__label">Join the discussion</label>
                                        </div>
                                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                            <i className="material-icons" role="presentation">check</i><span className="visuallyhidden">add comment</span>
                            </button>
                                    </form>
                                    <div className="comment mdl-color-text--grey-700">
                                        <header className="comment__header">
                                            <img src={co1} className="comment__avatar" />
                                            <div className="comment__author">
                                                <strong>James Splayd</strong>
                                                <span>2 days ago</span>
                                            </div>
                                        </header>
                                        <div className="comment__text">
                                            In in culpa nulla elit esse. Ex cillum enim aliquip sit sit ullamco ex eiusmod fugiat. Cupidatat ad minim officia mollit
                                            laborum magna dolor tempor cupidatat mollit. Est velit sit ad aliqua ullamco laborum excepteur
                                            dolore proident incididunt in labore elit.
                                        </div>
                                        <nav className="comment__actions">
                                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                                <i className="material-icons" role="presentation">thumb_up</i><span className="visuallyhidden">like comment</span>
                            </button>
                                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                                <i className="material-icons" role="presentation">thumb_down</i><span className="visuallyhidden">dislike comment</span>
                            </button>
                                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                                <i className="material-icons" role="presentation">share</i><span className="visuallyhidden">share comment</span>
                            </button>
                                        </nav>
                                        <div className="comment__answers">
                                            <div className="comment">
                                                <header className="comment__header">
                                                    <img src={co2} className="comment__avatar" />
                                                    <div className="comment__author">
                                                        <strong>John Dufry</strong>
                                                        <span>2 days ago</span>
                                                    </div>
                                                </header>
                                                <div className="comment__text">
                                                    Yep, agree!
                                                </div>
                                                <nav className="comment__actions">
                                                    <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                                    <i className="material-icons" role="presentation">thumb_up</i><span className="visuallyhidden">like comment</span>
                                </button>
                                                    <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                                    <i className="material-icons" role="presentation">thumb_down</i><span className="visuallyhidden">dislike comment</span>
                                </button>
                                                    <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                                    <i className="material-icons" role="presentation">share</i><span className="visuallyhidden">share comment</span>
                                </button>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <nav className="demo-nav mdl-color-text--grey-50 mdl-cell mdl-cell--12-col">
                                <Link to={"/A1"} className="demo-nav__button">
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon mdl-color--white mdl-color-text--grey-900" role="presentation">
                            <i className="material-icons">arrow_back</i>
                        </button>
                        Newer
                        </Link>
                                <div className="section-spacer"></div>
                                <Link to={"/A1"} className="demo-nav__button">
                        Older
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon mdl-color--white mdl-color-text--grey-900" role="presentation">
                            <i className="material-icons">arrow_forward</i>
                        </button>
                        </Link>
                            </nav>
                        </div>
                        <footer className="mdl-mini-footer">
                            <div className="mdl-mini-footer--left-section">
                                <button className="mdl-mini-footer--social-btn social-btn social-btn__twitter">
                        <span className="visuallyhidden">Twitter</span>
                        </button>
                                <button className="mdl-mini-footer--social-btn social-btn social-btn__blogger">
                        <span className="visuallyhidden">Facebook</span>
                        </button>
                                <button className="mdl-mini-footer--social-btn social-btn social-btn__gplus">
                        <span className="visuallyhidden">Google Plus</span>
                        </button>
                            </div>
                            <div className="mdl-mini-footer--right-section">
                                <button className="mdl-mini-footer--social-btn social-btn__share">
                        <i className="material-icons" role="presentation">share</i>
                        <span className="visuallyhidden">share</span>
                        </button>
                            </div>
                        </footer>
                    </main>
                    <div className="mdl-layout__obfuscator"></div>
                </div> 
        )
    }
}

export default A2;
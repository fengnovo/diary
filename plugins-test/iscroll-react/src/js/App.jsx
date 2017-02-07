import React from 'react';

let App = React.createClass({
    getInitialState: function() {
        return {
            loading : true
        }
    },
    componentDidMount: function(){

    },
    handleClick: function(){
        
    },
    render:function(){
        return 
            this.state.loading ? (<img id="loadingTip" className="loading-class" src="./loading.gif" />) :
                (<div className="time" id="wrapper" style={{display:'none'}}>
                    <div id="scroller">
                        <div id="pullDown">
                            <span className="pullDownIcon"></span>
                            <span className="pullDownLabel" style={{paddingLeft: '10px'}}>下拉刷新...</span>
                        </div>

                        <ul id='thelist'>
                            <div className="line" id="line"></div>
                            <div id="listCon"></div>
                        </ul>
                        <div id="pullUp">
                            <span className="pullUpIcon"></span>
                            <span className="pullUpLabel" style={{paddingLeft: '10px'}}>上拉加载更多...</span>
                        </div>
                        <div id="listEnd" className="list-end">本资讯由新浪财经提供</div>
                    </div>
                </div>
            </div>);
    }
});
export default App;

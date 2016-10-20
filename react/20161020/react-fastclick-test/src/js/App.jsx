import React from 'react';

let App = React.createClass({
    handleClick: function(){
        $(".am-share").addClass("am-modal-active");
        $('#content').addClass('cannot-scroll');
        var $s = $(".sharebg");
        if($s.css('display') == 'none'){
            $s.show().addClass("sharebg-active");
            
        }else{
            $s.addClass("sharebg-active");
        }
        
        $(".sharebg-active,.share_btn").click(function(){
            $('#content').removeClass('cannot-scroll');
            $(".am-share").removeClass("am-modal-active");
            setTimeout(function(){
                $(".sharebg-active").removeClass("sharebg-active");
                $s.hide();
            },300);
        })
    },
    render:function(){
        return (
            <div>
            <div className="">
                <span onClick={this.handleClick} className="share-click-btn">点击分享到</span>
                <span onClick={this.handleClick} className="share-click-btn">弹框</span>
                <span onClick={this.handleClick} className="share-click-btn">点击分享到</span>
                <span onClick={this.handleClick} className="share-click-btn">点击分享到</span>
                <span onClick={this.handleClick} className="share-click-btn">点击分享到</span>
                <span onClick={this.handleClick} className="share-click-btn">点击分享到</span>
                <span onClick={this.handleClick} className="share-click-btn">点击分享到</span>
                <span onClick={this.handleClick} className="share-click-btn">点击分享到</span>
                <span onClick={this.handleClick} className="share-click-btn">点击分享到</span>
                <span onClick={this.handleClick} className="share-click-btn">点击分享到</span>
                <span onClick={this.handleClick} className="share-click-btn">点击分享到</span>
                    
            </div>
            <div className="am-share">
                  <h3 className="am-share-title">分享到</h3>
                  <ul className="am-share-sns">
                        <li><a href="#"> <i className="share-icon-weibo"></i> <span>新浪微博</span> </a> </li>
                        <li><a href="#"> <i className="share-icon-weibo"></i> <span>新浪微博</span> </a> </li>
                        <li><a href="#"> <i className="share-icon-weibo"></i> <span>新浪微博</span> </a> </li>
                        <li><a href="#"> <i className="share-icon-weibo"></i> <span>新浪微博</span> </a> </li>
                  </ul>
                  <div className="am-share-footer"><button className="share_btn">取消</button></div>
            </div>
            <div className="sharebg" style={{'display':'none'}}></div>
            </div>);
    }
});
export default App;

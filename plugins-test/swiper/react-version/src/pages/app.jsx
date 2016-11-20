import React from 'react';
import ReactDOM from 'react-dom';
// import $ from './../libs/jquery-1.9.1.min.js';
import $ from 'jquery';
import './../libs/swiper.min.js';
import iScroll from './../libs/iscroll.js';
import iscrollInstance from './../libs/iscrollInstance.js';


const bl = {
  loadPlateId : '5572a108b3cdc86cf39001ce',
  loadPlate : true,                   //是否加载板块
  iscrollList : undefined,                //iscroll实例
  pageNum : 1,                          //列表页面
  isOper : true,                        //列表是否可再加载
  pageNumData : [],   
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount () {
    console.log('componentWillMount');
    var formatterDateTime = function() {
          var date=new Date()
          var month=date.getMonth() + 1
              var datetime = date.getFullYear()
                      + ""// "年"
                      + (month >= 10 ? month : "0"+ month)
                      + ""// "月"
                      + (date.getDate() < 10 ? "0" + date.getDate() : date
                              .getDate())
                      + ""
                      + (date.getHours() < 10 ? "0" + date.getHours() : date
                              .getHours())
                      + ""
                      + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                              .getMinutes())
                      + ""
                      + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                              .getSeconds());
            return datetime;
        }
    let _this = this;
    var renderData = function(data) {
      $("#pullDown").show();
      var datas =  data.showapi_res_body.pagebean.contentlist;
      _this.setState({
        data: datas
      });
      $(".bodyLoad").remove();
    }
    $.ajax({
          type: 'get',
          url: 'https://route.showapi.com/109-35?channelId='+bl.loadPlateId
          +'&channelName=&maxResult=20&needAllList=0&needContent=0&needHtml=0&page='+
          bl.pageNum+'&showapi_appid=27453&showapi_timestamp='+
          formatterDateTime()+'&showapi_sign=c2dfc63cf8054db8b87bcf204a4987dd',
          error: function(XmlHttpRequest, textStatus, errorThrown) {
              alert("操作失败!");
          },
          success: function(result) {
              console.log(result) //console变量在ie低版本下不能用
              renderData(result);
          }
      });
  }

  componentDidMount() {
    let _this = this;
    var renderData = function(data) {             //渲染数据
      $("#pullDown").show();
      var datas =  data.showapi_res_body.pagebean.contentlist;
      _this.setState({
        data: datas
      });
          $(".bodyLoad").remove();
          // if (datas.length > 0) {
          //   $("#pullUp").show();
          //     var template = _.template($("#tpl").html())(datas);
          //     $("#item-list").append(template);
          //     datas.splice(0, 8);
          //     this.pageNumData = datas;
          //     this.isOper = true;
          //     if(this.pageNum === 1){
          //       this.loaded.call(bl);
          //     }
          //     this.iscrollList.refresh();
          //     this.refreshBind();
          //     if (datas.length < 8) {
          //       $("#pullUp").hide();
          //     }
          //     setTimeout(function(){
          //       bl.pageNum++;
          //     },50);
          // } else {
          //   this.isOper = false;
          //     $("#pullUp").hide();
          //     if (this.pageNum === 1) {
          //         var _content3 = "<div class=\"collection\" style=\"position:fixed;top:20rem\">"
          //             + "<img src=\"../../images/bangdan.png\" alt=\"\" width=\"14%\" height=\"auto\">"
          //             + "<p class=\"f_c_b8b8b8 f16\">暂无帖子</p></div>";
          //         $("#item-list").html(_content3);
          //         this.loaded.call(bl);
          //         this.iscrollList.refresh();
          //     } else {
          //         console.log('没有更多数据');
          //     }
          // }
    }



    var callData = function(){          //数据请求
      var formatterDateTime = function() {
          var date=new Date()
          var month=date.getMonth() + 1
              var datetime = date.getFullYear()
                      + ""// "年"
                      + (month >= 10 ? month : "0"+ month)
                      + ""// "月"
                      + (date.getDate() < 10 ? "0" + date.getDate() : date
                              .getDate())
                      + ""
                      + (date.getHours() < 10 ? "0" + date.getHours() : date
                              .getHours())
                      + ""
                      + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                              .getMinutes())
                      + ""
                      + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                              .getSeconds());
            return datetime;
        }
      var successFunction = function(data){
        renderData(data);
      };
      var errorFunction = function(data){
        $(".bodyLoad").remove();
        console.log("数据请求出错");
      };
      $.ajax({
          type: 'get',
          url: 'https://route.showapi.com/109-35?channelId='+bl.loadPlateId
          +'&channelName=&maxResult=20&needAllList=0&needContent=0&needHtml=0&page='+
          bl.pageNum+'&showapi_appid=27453&showapi_timestamp='+
          formatterDateTime()+'&showapi_sign=c2dfc63cf8054db8b87bcf204a4987dd',
          error: function(XmlHttpRequest, textStatus, errorThrown) {
              alert("操作失败!");
          },
          success: function(result) {
              console.log(result) //console变量在ie低版本下不能用
              successFunction(result);
          }
      });
    };


      var successFunction = function(data){
      var temList = data.showapi_res_body.channelList;
      var sw1 = '<div class="swiper-slide active" name="'+temList[0].channelId+'">'+temList[0].name+'</div>';
      var sw2 = '<li class="active" name="'+temList[0].channelId+'">'+temList[0].name+'</li>';
      temList.shift();
      temList.forEach(function(item){
        sw1 += '<div class="swiper-slide" name="'+item.channelId+'">'+item.name+'</div>';
        sw2 += '<li name="'+item.channelId+'">'+item.name+'</li>';
      });
      $("#swiper_w1").html(sw1);
      $("#swiper_w2").prepend(sw2);
      //导航分类初始化
      var mySwiper = new Swiper('.swiper-container', {
          paginationClickable :true,
          slidesPerView: 3,
          freeMode: true
      });
      //打开分类菜单
      $('.swiper-nav-button').click(function(){
          $('.swiper-nav-box').slideDown();
      });
      //选择分类菜单
      $('.swiper-nav-box ul li').click(function(){
          var navIndex = $(this).index();
          bl.pageNum = 1;
          bl.loadPlateId = $(this).attr("name");
          mySwiper.slideTo(navIndex, 1000, false);//切换到第一个slide，速度为1秒
          $('.swiper-wrapper div').eq(navIndex).addClass('active').siblings().removeClass('active');
          $('.swiper-nav-box ul li').eq(navIndex).addClass('active').siblings().removeClass('active');
          $('.swiper-nav-box').slideUp('fast');
          $("#pullUp").hide();
          $("#pullDown").show();
          $("#item-list").html('<div class="bodyLoad" style="margin:8px auto 0px;"></div>');
           _this.setState({
            data: []
          });
          callData();
      });
      //关闭分类菜单
      $('.swiper-page-button-up').click(function(){
          $('.swiper-nav-box').slideUp('fast');
      });
      //被选中的分类上色
      $('.swiper-wrapper div').click(function(){
        // bl.iscrollList.scrollToElement("li:nth-child(1)", 0);
          var navIndex = $(this).index();
          bl.pageNum = 1;
          bl.loadPlateId = $(this).attr("name");
          $(this).addClass('active').siblings().removeClass('active');
          $('.swiper-nav-box ul li').eq(navIndex).addClass('active').siblings().removeClass('active');
          $("#pullUp").hide();
          $("#pullDown").show();
          $("#item-list").html('<div class="bodyLoad" style="margin:8px auto 0px;"></div>');
          _this.setState({
            data: []
          });
          callData();
      });
      bl.loadPlate = false;
    }
    var formatterDateTime = function() {
        var date=new Date()
        var month=date.getMonth() + 1
            var datetime = date.getFullYear()
                    + ""// "年"
                    + (month >= 10 ? month : "0"+ month)
                    + ""// "月"
                    + (date.getDate() < 10 ? "0" + date.getDate() : date
                            .getDate())
                    + ""
                    + (date.getHours() < 10 ? "0" + date.getHours() : date
                            .getHours())
                    + ""
                    + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                            .getMinutes())
                    + ""
                    + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                            .getSeconds());
          return datetime;
      }
    $.ajax({
        type: 'get',
        url: 'https://route.showapi.com/109-34?showapi_appid=27453&showapi_timestamp='+
        formatterDateTime()+'&showapi_sign=c2dfc63cf8054db8b87bcf204a4987dd',
        error: function(XmlHttpRequest, textStatus, errorThrown) {
            alert("操作失败!");
        },
        success: function(result) {
            successFunction(result);
        }
    });

      
  }

  componentWillUnmount() {
  


  }


  render() {
    return (
      <div>
        <div className="classification-box">
            <div className="swiper-box flex">
                <div className="swiper-container flex-1">
                    <div className="swiper-wrapper" id="swiper_w1">
                      
                    </div>
                </div>
                <div className="swiper-nav-button"></div>
            </div>
            <div className="swiper-nav-box">
                <ul id="swiper_w2">
                    
                    <div className="swiper-page-button-up"></div>
                </ul>
            </div>
        </div>
        <div className="con-wrap" id="wrapper">
            <section className="item-list">
                <dl id="scroller">
                    <div id="pullDown">
                        <span className="pullDownIcon"></span>
                        <span className="pullDownLabel">下拉刷新...</span>
                    </div>
                   <List data={this.state.data}/>
                    <div id="pullUp" style={{'display':'none'}}>
                        <span className="pullUpIcon"></span>
                        <span className="pullUpLabel">上拉加载更多...</span>
                    </div>
                </dl>
            </section>
        </div>
      </div>
    );
  }
}

class List extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
      if (bl.iscrollList instanceof iScroll) {
        bl.iscrollList.destroy();
      }
      bl.iscrollList = new iscrollInstance.fcScroll('wrapper', 'pullDown', 
      'pullUp', '.pullDownLabel', '.pullUpLabel', function(){}, function(){});
      bl.iscrollList.refresh();
  }

  render() {
      let arr = [];
      this.props.data.forEach((value)=>{
            arr.push (<li key={value.link} className="bbs-list-li" id={value.link}>
              <h1 className="flex"><p className="text-over" style={{"maxWidth": "100%"}}>{value.title}</p>
              </h1>
              <h3 className="f_c_999">{value.source}&nbsp;&nbsp;{value.pubDate}</h3>
              <div className="bbs-list-content">{value.desc}</div>
              </li>);
      });
      return (
            <ul id="item-list">
              {arr}
            </ul>
      );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
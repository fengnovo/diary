import React from 'react';
import $ from 'jquery';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';

import './App.css';

class App extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
  };

  static defaultProps = {
    className: 'queue-demo',
  };

  constructor(props) {
    super(props);
    this.openIndex = null;
    this.position = {};
    this.isLoadingMore = false;
    this.page = 1;
    this.state = {
      dataArray: [],
      animation: [],
      style: [],
      more: false
    };
    this.ajaxData.bind(this);
  }

  componentDidMount() {
    if (window.addEventListener) {
      window.addEventListener('touchend', this.onTouchEnd);
      window.addEventListener('mouseup', this.onTouchEnd);
    } else {
      window.attachEvent('ontouchend', this.onTouchEnd);
      window.attachEvent('onmouseup', this.onTouchEnd);
    }
    let _this = this;
    $(window).unbind().on('scroll',function(){
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const scrollTop = document.body.scrollTop;
        const wholeHeight = document.body.scrollHeight;
        if(windowHeight + scrollTop >= wholeHeight && !_this.isLoadingMore){
        	ajaxData.call(_this);
        }
    });
  }

  componentWillUnmount() {
    if (window.addEventListener) {
      window.removeEventListener('touchend', this.onTouchEnd);
      window.removeEventListener('mouseup', this.onTouchEnd);
    } else {
      window.detachEvent('onresize', this.onTouchEnd);
      window.detachEvent('onmouseup', this.onTouchEnd);
    }
  }

  ajaxData () {
  	var _this = this;
  	_this.isLoadingMore = true;
  	$.ajax({
    	dataType: 'jsonp',
    	url:'http://api.dagoogle.cn/news/get-news?tableNum=1&pagesize=10&page='+_this.page,
    	success: function(data) {
    		console.log(data.data);
    		let list = data.data;
    		let arr = _this.state.dataArray;
    		list.map(item => {
    			arr.push({
		          top_image: item.top_image,
		          title: item.title,
		          news_id: item.news_id,
		        });
    		});
    		
	        _this.setState({
            	more: true,
            	dataArray: arr
            });
    		_this.isLoadingMore = false;
    		_this.page++;
    	},
    	error: function(data) {
    		console.log('error');
    		console.log(data);
    		_this.isLoadingMore = false;
    	}
    })
  }

  onDelete = () => {
    const dataArray = this.state.dataArray;
    const deleteData = dataArray.filter(item => item.news_id === this.openIndex)[0];
    const i = dataArray.indexOf(deleteData);
    dataArray.splice(i, 1);
    delete this.state.style[this.openIndex];
    this.openIndex = null;
    this.setState({ dataArray });
  };

  onTouchStart = (e, i) => {
    if (this.openIndex || this.openIndex === 0) {
      const animation = this.state.animation;
      animation[this.openIndex] = { x: 0, ease: 'easeOutBack' };
      this.setState({ animation }, () => {
        delete this.state.style[this.openIndex];
      });
      this.openIndex = null;
      return;
    }
    this.index = i;
    this.mouseXY = {
      startX: e.touches === undefined ? e.clientX : e.touches[0].clientX,
    };
  };

  onTouchEnd = () => {
    if (!this.mouseXY) {
      return;
    }
    const animation = this.state.animation;
    if (this.position[this.index] <= -60) {
      this.openIndex = this.index;
      animation[this.index] = { x: -60, ease: 'easeOutBack' };
    } else {
      animation[this.index] = { x: 0, ease: 'easeOutBack' };
    }
    delete this.mouseXY;
    delete this.position[this.index];
    this.index = null;
    this.setState({ animation });
  };

  onTouchMove = (e) => {
    if (!this.mouseXY) {
      return;
    }
    const currentX = e.touches === undefined ? e.clientX : e.touches[0].clientX;
    let x = currentX - this.mouseXY.startX;
    x = x > 10 ? 10 + (x - 10) * 0.2 : x;
    x = x < -60 ? -60 + (x + 60) * 0.2 : x;
    this.position[this.index] = x;
    const style = this.state.style;
    style[this.index] = { transform: `translateX(${x}px)` };
    const animation = [];
    this.setState({ style, animation });
  };

  render() {
    const liChildren = this.state.dataArray.map((item) => {
      const { top_image, title, news_id } = item;
      return (<li
        key={news_id}
        onMouseMove={this.onTouchMove}
        onTouchMove={this.onTouchMove}
      >
        <div className={`${this.props.className}-delete`}>
          <a onClick={e => this.onDelete(e)}>删除</a>
        </div>
        <TweenOne
          className={`${this.props.className}-content`}
          onTouchStart={e => this.onTouchStart(e, news_id)}
          onMouseDown={e => this.onTouchStart(e, news_id)}
          onTouchEnd={this.onTouchEnd}
          onMouseUp={this.onTouchEnd}
          animation={this.state.animation[news_id]}
          style={this.state.style[news_id]}
        >
          <div className={`${this.props.className}-img`}>
            <img src={top_image} width="44" height="44" onDragStart={e => e.preventDefault()} />
          </div>
          <p>{title}</p>
        </TweenOne>
      </li>);
    });
    return (<div>
      <div className={`${this.props.className}-wrapper`}>
        <div className={this.props.className}>
          <div className={`${this.props.className}-header`}>
            <i />
            <span>Ant Motion</span>
          </div>
          <QueueAnim
            component="ul"
            animConfig={[
              { opacity: [1, 0], translateY: [0, 30] },
              { height: 0 },
            ]}
            ease={['easeOutQuart', 'easeInOutQuart']}
            duration={[550, 450]}
            interval={150}
          >
            {liChildren}
          </QueueAnim>
          {this.state.more ? <div>加载中...</div> : null}
        </div>
      </div>
    </div>);
  }
} 

export default App;
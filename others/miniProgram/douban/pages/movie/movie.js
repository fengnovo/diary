import utils from '../../utils/util.js';
Page({
  data: {
    imgUrls: [
      'https://gw.alicdn.com/i2/TB1JvBsIcbpK1RjSZFyXXX_qFXa_.jpg_600x600Q30.jpg',
      'https://gw.alicdn.com/i3/TB1.zuXJkvoK1RjSZFwXXciCFXa_.jpg_600x600Q30.jpg',
      'https://gw.alicdn.com/i3/TB1s5FVJmrqK1RjSZK9XXXyypXa_.jpg_600x600Q30.jpg',
      'https://gw.alicdn.com/i1/TB13iFVJmrqK1RjSZK9XXXyypXa_.jpg_600x600Q30.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    movies: [],
    hide: false
  },
  onLoad(options) {
    this.loadMoive();
  },
  onReady() {
    // Do something when page ready.
  },
  onShow() {
    // Do something when page show.
  },
  onHide() {
    // Do something when page hide.
  },
  onUnload() {
    // Do something when page close.
  },
  onPullDownRefresh() {
    // Do something when pull down.
  },
  onReachBottom() {
    // Do something when page reach bottom.
  },
  onShareAppMessage() {
    // return custom share data when user share.
  },
  onPageScroll() {
    // Do something when page scroll
  },
  detail(e) {
    getApp().toDetailPage(e);
  },
  loadMoive(){
    var page = this;
    wx.request({
      url: 'https://fengnovo.cn/v2/movie/in_theaters',
      header: {
        'Content-Type': 'application/xml'
      },
      success: function (res) {
        
        var subjects = res.data.subjects;
        utils.processSubjects(subjects);
        page.setData({ movies: subjects, hide: true});
      }
    });
  }

});
import utils from '../../utils/util.js';
Page({
  data: {
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
  loadMoive() {
    var page = this;
    wx.request({
      url: 'https://fengnovo.cn/v2/movie/top250',
      header: {
        'Content-Type': 'application/xml'
      },
      success: function (res) {

        var subjects = res.data.subjects;
        utils.processSubjects(subjects);
        page.setData({ movies: subjects, hide: true });
      }
    });
  }

});
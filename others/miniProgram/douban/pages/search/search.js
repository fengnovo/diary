import utils from '../../utils/util.js';
Page({
  data: {
    movies: [],
    hide: true
  },
  onLoad(options) {
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
  bindKeyInput(e) {
    this.setData({inputValue: e.detail.value});
  },
  search() {
    var page = this;
    var inputValue = page.data.inputValue;
    if (!inputValue) {
      
      return;
    }
    page.setData({ hide: false });
    wx.request({
      url: 'https://fengnovo.cn/v2/movie/search?q=' + page.data.inputValue,
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
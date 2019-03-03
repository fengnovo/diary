import utils from '../../utils/util.js';
Page({
  data: {
    movie: {},
    imgs: [],
    hide: false
  },
  onLoad(options) {
    this.loadMoive(options.id);
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
  openImg(event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: this.data.imgs // 需要预览的图片http链接列表
    })
  },

  loadMoive(movieId) {
    var page = this;
    wx.request({
      url: 'https://fengnovo.cn/v2/movie/subject/' + movieId,
      header: {
        'Content-Type': 'application/xml'
      },
      success: function (res) {
        var subject = res.data;
        utils.processSubject(subject);
        var imgs = [];
        imgs.push(subject.images.large);
        subject.casts.forEach(i => imgs.push(i.avatars.large));
        console.log(imgs);
        page.setData({ movie: subject, hide: true, imgs: imgs });
      }
    });
  }

});
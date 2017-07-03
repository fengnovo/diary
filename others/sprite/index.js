var fs = require('fs')
  , gm = require('gm');
 
// resize and remove EXIF profile data 
// gm()
// .in('-page', '+0+0') 
// .in('./img/bad_network.png')
// .in('-page', '+256+0')

// .in('./img/close.png')
//  .in('-page', '+0+256')
// .in('./img/comment.png')
// .in('./img/comment-1.png')
// .in('./img/comment-2.png')
// .in('./img/comment-3.png')
// .in('./img/favor.png')

gm('./img/bad_network.png')
.append('./img/close.png',
 './img/comment.png')
.write('./dist/resize.png', function (err) {
  if (err) {
  	console.log(err);
  }else{
  	console.log('done');
  }
});
 

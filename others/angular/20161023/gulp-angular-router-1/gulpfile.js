var BUILD_DIR = 'web';

// 引入 gulp
var gulp = require('gulp'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    historyApiFallback = require('connect-history-api-fallback'),
    
    minimist = require('minimist'),
    gulpif = require('gulp-if'),
    runSequence = require('run-sequence'),
    rev =  require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),

    header = require('gulp-header'),
    minifyHTML   = require('gulp-minify-html'),
    minifycss = require('gulp-minify-css'),//css压缩
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify');//提示信息



gulp.task('browser', function () {
  var proxyMiddleware = require('http-proxy-middleware');
  var proxy = proxyMiddleware('/episodes', {target: 'http://pod.gf.com.cn/api/information/podcastserver/1.0.0/'});
  var proxy1 = proxyMiddleware('/list', {target: 'http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=0&city=&dfc=1&charset=utf-8/'});
  var proxy2 = proxyMiddleware('/action', {target: 'http://10.2.130.20:9000/'});
  var proxy3 = proxyMiddleware('/read', {target: 'http://10.2.130.20:9000/'});
  browserSync.init({
        server: {
            baseDir: "./" + BUILD_DIR,
            port: 3000,
            // middleware: [proxy]
            middleware: [proxy, proxy1,proxy2,proxy3]
        }
  });
});

gulp.task('clean', function () {
    return del([
        BUILD_DIR
    ], { force: true });
});


// 复制
gulp.task('copy', function() {
    gulp.src(['src/img/**/*'], {base: 'src'})
      .pipe(gulp.dest('web/'));
    return gulp.src(['src/page/*.html', 'src/index.html'], {base: 'src'})
      // .pipe(gulpif(argv.dist, minifyHTML({
      //   empty:true,
      //   spare:true
      // })))
      .pipe(gulp.dest('web/'));
});

 
// 合并、压缩、重命名css
gulp.task('css', function() {
  return gulp.src('src/css/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('web/css'))  
    .pipe(notify({ message: 'css task ok' }));
});


// 合并、压缩js文件
gulp.task('lib_js', function() {
  return gulp.src(['src/js/vendor/jquery.js','src/js/vendor/angular.min.js','src/js/vendor/angular-route.js'])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('web/js/'))
    .pipe(notify({ message: 'js task ok' }));
});

gulp.task('user_js', function() {
  return gulp.src(['src/js/script.js', 'src/js/controllers/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('web/js'))
    .pipe(notify({ message: 'js task ok' }));
});


 
// 默认任务
gulp.task('default', function (cb) {
  runSequence('clean', 'copy', 'css', 'lib_js', 'user_js', 'browser', cb);
    gulp.watch(['src/index.html', 'src/page/*.html'], ['copy']);
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/js/controllers/*.js', ['user_js']);
});

// 发布任务
gulp.task('build', function (cb) {
  runSequence('clean', 'copy', 'css', 'lib_js', 'user_js', 'browser', cb);
});
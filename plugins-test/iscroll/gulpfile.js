var gulp = require('gulp'),
    path = require('path'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    historyApiFallback = require('connect-history-api-fallback'),
    minimist = require('minimist'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),        //js压缩
    concat = require('gulp-concat'),        //文件合并
    minifycss = require('gulp-minify-css'); //css压缩


var argv = minimist(process.argv.slice(2), { boolean: true });
console.dir(argv);


var SRC_DIR = './src/';
var DIST_DIR = './web/';

var AUTO_PREFIXER_RULES = [
    'ie >= 9',
    'chrome >= 34',
    'safari >= 6',
    'ios >= 7',
    'android >= 4.1'
];



gulp.task('browser-sync', function () {
    var proxyMiddleware = require('http-proxy-middleware');
    var proxy1 = proxyMiddleware('https://raw.githubusercontent.com/fengnovo/diary/master/plugins-test/iscroll/ajax-json',
        {target: 'https://raw.githubusercontent.com/fengnovo/diary/master/plugins-test/iscroll/ajax-json/'});
    browserSync.init({
        server: {
            baseDir: DIST_DIR,
            middleware: [historyApiFallback(), proxy1]
        }
    });
});

gulp.task('copy_iscroll', function(cb) {       //开发复制资讯直播列表部分
    return gulp.src('./src/*')
        .pipe(gulp.dest('./web/'));
});



gulp.task('copy_build_iscroll_js', function() {
    return gulp.src(['./src/zepto.min.js','./src/iscroll.js','./src/main.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./web/'));
});

gulp.task('copy_build_iscroll_css', function() {
    return gulp.src('./src/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./web/')) ;
});

gulp.task('copy_build_iscroll', function() {
    return gulp.src(['./src/*.gif','./src/*.png','./src/*.html'])
        .pipe(gulp.dest('./web/')) ;
});

gulp.task('build_iscroll', function() {      
    gulp.start(['copy_build_iscroll_js', 'copy_build_iscroll_css','copy_build_iscroll']);
});





/* build && clean */
gulp.task('clean', function(cb) {
    return del(['./web/'], { force: true }, cb);
});


gulp.task('default', function (cb) {
    runSequence('clean','browser-sync', 'copy_iscroll', function () {
        cb && cb();
    })
});

gulp.task('build', ['clean'], function(){
    gulp.start(['build_liveList']);
});
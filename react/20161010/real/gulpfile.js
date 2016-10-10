var path = require('path');
  del = require('del'),
  gulp = require('gulp'),
  webpackStream = require('webpack-stream'),
  browserSync = require('browser-sync').create(),
  historyApiFallback = require('connect-history-api-fallback'),
  
  minimist = require('minimist'),
  gulpif = require('gulp-if'),
  gulpsize = require('gulp-size'),
  runSequence = require('run-sequence'),
  rev =  require('gulp-rev'),
  revCollector = require('gulp-rev-collector'),

  header = require('gulp-header'),
  minifyHTML   = require('gulp-minify-html'),
  uglify = require('gulp-uglify'),//js压缩
  eslint = require('gulp-eslint'),//es6检测
  concat = require('gulp-concat'),//文件合并
  notify = require('gulp-notify'),//提示信息
  notifier = require('node-notifier'),//提示信息

  // css
  sass = require('gulp-sass'),
  sassGlob = require('gulp-sass-glob'),
  postcss = require('gulp-postcss'),
  assets = require('postcss-assets'),
  cssnano = require('cssnano'), 
  sassLint = require('gulp-sass-lint'),
  autoprefixer = require('autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  minifycss = require('gulp-minify-css');//css压缩

// set variable via $ gulp --type production

var argv = minimist(process.argv.slice(2), { boolean: true });
console.dir(argv);

var webpackConfig = require('./webpack.config.js').getConfig(argv.pub);

var SRC_DIR = './src/';
var DIST_DIR = './web/';

// https://github.com/ai/autoprefixer
var AUTO_PREFIXER_RULES = [                 
  'ie >= 9',
  'chrome >= 34',
  'safari >= 6'
  ];

/*var AUTO_PREFIXER_RULES = ['last 5 versions'];*/

gulp.task('js_lint', function () {
  gulp.src(['src/js/**/*.jsx', 'src/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.results(function (results) {
        if (results.errorCount === 0 && results.warningCount === 0) {
            return;
        }

        notifier.notify({
            title: 'Error running Gulp',
            message: 'JavaScript ESLint error.',
            icon: path.join(__dirname, 'node_modules', 'gulp-notify', 'assets', 'gulp-error.png'),
            sound: 'Frog'
        });
    }));
});

gulp.task('js_build', /*['js_lint'], */function() {
  return gulp.src(webpackConfig.entry)
    .pipe(webpackStream(webpackConfig))
    .pipe(gulpif(argv.pub, uglify()))
    .pipe(gulp.dest(DIST_DIR + 'js/'))
    .pipe(gulpsize({ title : 'js' }))
    .pipe(gulpif(!argv.pub, browserSync.stream()))  // 开发模式下，自动刷新
    .pipe(notify({ message: 'js_build task ok' }));
});

// copy index.html from src to dist
gulp.task('html', function() {
  return gulp.src(SRC_DIR + 'index.html')
    .pipe(gulp.dest(DIST_DIR))
    .pipe(gulpsize({ title : 'html' }))
    .pipe(gulpif(!argv.pub, browserSync.stream()))  // 开发模式下，自动刷新
    .pipe(notify({ message: 'html task ok' }));
});
// copy test data from src to dist
gulp.task('test_data', function() {
  return gulp.src(SRC_DIR + 'test/*.json')
    .pipe(gulp.dest(DIST_DIR + 'test'))
    .pipe(gulpsize({ title : 'test data' }))
    .pipe(gulpif(!argv.pub, browserSync.stream()))  // 开发模式下，自动刷新
    .pipe(notify({ message: 'test_data task ok' }));
});


// 
gulp.task('scss', ['css_lint'], function() {
    return gulp.src('src/css/main.scss')
        .pipe(sassGlob())
        .pipe(gulpif(!argv.pub, sourcemaps.init()))
        .pipe(sass().on('error', notify.onError('Error: <%= error.message %>')))
        .pipe(gulpif(!argv.pub, postcss([
            assets({ basePath: DIST_DIR }),
            autoprefixer({ browsers: AUTO_PREFIXER_RULES })
        ])
        .on('error', notify.onError('Error: <%= error.message %>'))))
        .pipe(gulpif(argv.pub, postcss([
            assets({ basePath: DIST_DIR }),
            autoprefixer({ browsers: AUTO_PREFIXER_RULES }),
            cssnano
        ])
        .on('error', notify.onError('Error: <%= error.message %>'))))
        .pipe(gulpif(!argv.pub, sourcemaps.write('./')))
        .pipe(gulp.dest(DIST_DIR + 'css/'))
        .pipe(gulpif(!argv.pub, browserSync.stream()))
        .pipe(notify({ message: 'SCSS build completed.'}));
});

// -------------------------------------
//   Task: Lint SCSS
// -------------------------------------
gulp.task('css_lint', function() {
  gulp.src('src/scss/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format());
});

// add livereload on the given port
gulp.task('browser-sync', function () {
    var proxyMiddleware = require('http-proxy-middleware');
    var proxy = proxyMiddleware('/api', {target: 'http://10.2.122.58:88'/*, pathRewrite: {'^/api' : ''}*/});
    browserSync.init({
        server: {
            baseDir: DIST_DIR,
            middleware: [historyApiFallback(), proxy]
        }
    });
});

// copy images
gulp.task('img', function(cb) {
  return gulp.src(SRC_DIR + 'img/*.{png,jpg,jpeg,gif}')
    .pipe(gulpsize({ title : 'images' }))
    .pipe(gulp.dest(DIST_DIR + 'img/'));
});

// watch styl, html and js file changes
gulp.task('watch', function() {
  gulp.watch(SRC_DIR + 'css/**/*.scss', ['scss']);
  gulp.watch(SRC_DIR + 'index.html', ['html']);
  gulp.watch(SRC_DIR + 'js/**/*.js', ['js_build']);
  gulp.watch(SRC_DIR + 'js/**/*.jsx', ['js_build']);
});

// remove bundels
gulp.task('clean', function(cb) {
  return del([DIST_DIR], { force: true }, cb);
});


// by default build project and then watch files in order to trigger livereload
gulp.task('default', function (cb) {
  runSequence('clean', 'img', 'html', 'test_data', 'js_build', 'scss', 'browser-sync', 'watch', function () {
      cb && cb();
  })
});
// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function(){
  gulp.start(['img', 'html','js_build','scss']);
});

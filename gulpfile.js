var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var cache = require('gulp-cache');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var server = lr();
var path = {
    css:  'src/styles/*.css',
    html: 'src/templates/*.html',
    images: 'src/images/*.*',
    vendor: {
	css: 'src/vendor/*.css'
    },
    partials: 'src/templates/partials/*.html',
    mock: 'src/mockapi/*.json',
    js: 'src/scripts/*.js',
    dist: {
      css:  'dist/styles/',
      html: 'dist/',
      images: 'dist/images/',
      vendor: 'dist/vendor/',
      mock: 'dist/mockapi/',
      js: 'dist/scripts/',
    partials: 'dist/partials/'
    }
};


gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('mock', function () {
  return gulp.src(path.mock)
    .pipe(concat('content.json'))
    .pipe(gulp.dest(path.dist.mock));
});

gulp.task('partials', function () {
  return gulp.src(path.partials)
    .pipe(concat('article.html'))
    .pipe(gulp.dest(path.dist.partials));
});

gulp.task('js', function () {
  return gulp.src(path.js)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(autoprefixer({
        browsers: ['last 4 versions']
    }))
    .pipe(concat('style.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('vendor', function () {
  return gulp.src(path.vendor.css)
    .pipe(cssmin())
    .pipe(gulp.dest(path.dist.vendor));
});

gulp.task('html', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('images', function() {
  return gulp.src(path.images)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(livereload(server))
    .pipe(gulp.dest(path.dist.images));
});


gulp.task('build', ['html', 'css', 'images','vendor', 'js','mock', 'partials']);

gulp.task('watch', function () {
  gulp.watch(path.css, ['css']);
  gulp.watch(path.js, ['js']);
  gulp.watch(path.html, ['html']);
  gulp.watch(path.partials, ['partials']);
  gulp.watch(path.vendor.css, ['vendor-css']);
  gulp.watch(path.images, ['img']);
  gulp.watch(path.mock, ['mock']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});
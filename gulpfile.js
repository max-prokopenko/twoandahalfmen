var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    gutil = require('gulp-util'),
    connect = require('gulp-connect-php'),
    strip = require('gulp-strip-comments'),
    babelify = require('babelify'),
    fs = require("fs"),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    jquery = require('gulp-jquery');

var paths = {
    app: 'app/',
    dist: 'dist/',
};

/*gulp.task('es6', function () {
  gulp.src('app/scripts/modules/app.js')
    .pipe(browserify({
      transform: ['babelify'],
    }))
    .pipe(gulp.dest('dist/scripts'))
});*/

gulp.task('es6', function() {
    browserify("./app/scripts/modules/app.js")
      .transform("babelify", {presets: ["es2015"]})
      .bundle()
      .pipe(fs.createWriteStream("./dist/scripts/bundle.js"));
  });




gulp.task('styles', () => {
    return gulp.src('app/styles/**/*.scss')
        //.pipe(strip())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({
            message: 'Styles done'
        }));
});



gulp.task('scripts', () => {
    return gulp.src(['app/scripts/**/*.js', '!app/scripts/vendor/*.js', '!app/scripts/modules/**/*.js'])
        .pipe(concat('main.js'))
        //.pipe(strip())
        //.pipe(uglify().on('error', gutil.log))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(notify({
            message: 'Scripts done'
        }));
});
gulp.task('vendor', () => {
    return gulp.src('app/scripts/vendor/**/*.js')
        .pipe(concat('libs.js'))
        //.pipe(strip())
        .pipe(uglify().on('error', gutil.log))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(notify({
            message: 'Vendor scripts done'
        }));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({
            message: 'Images done'
        }));
});

gulp.task('html', function() {
    gulp.src('index.html', {
        cwd: paths.app
    })
        .pipe(gulp.dest(paths.dist))
        .pipe(notify({
            message: 'HTML done'
        }));
});


gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('build', ['clean'], function() {
    gulp.start('html', 'vendor', 'styles', 'images');
});


gulp.task('watch', function() {
    gulp.watch('app/styles/**/*.scss', [
        ['styles'], browserSync.reload
    ]);
    gulp.watch(['app/scripts/**/*.js', '!app/scripts/modules/**/*.js'], [
        ['scripts'], browserSync.reload
    ]);
    gulp.watch('app/images/**/*', [
        ['images'], browserSync.reload
    ]);
    gulp.watch('app/index.html', [
        ['html'], browserSync.reload
    ]);
     gulp.watch('app/scripts/modules/**/*', [
        ['es6'], browserSync.reload
    ]);
    
    gulp.start('browser-sync');
});
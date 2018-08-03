/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp");
var $ = require('gulp-load-plugins')();
var del = require('del');


var browserSync = require('browser-sync').create();
browserSync.init({
    server: "./src/"
});
browserSync.stream();

var config = {
    src: {
        root: './src/',
        js: './src/js/*.js',
        css: ['./src/css/*.css', '!./src/css/*.min.css'],
        html: './src/*.html'
    },
    dist: {
        root: './dist/',
        js: './dist/js/',
        css: './dist/css/',
        html: './dist/'
    }
}


/*
 * clean dist folder
 */
/*gulp.task('clean', function (done) {
    del([config.dist.root], done);
  });
*/

/*
 * minimize html files
 */
gulp.task('html:dist', function () {
    return gulp.src(config.src.html)
        .pipe($.plumber())
        .pipe($.htmlclean())
        .pipe(gulp.dest(config.dist.html));
});


/*
 * Add vendor prefixes to CSS rules, bundle, minimize, and generate source map for the final css file
 */
gulp.task('css:dist', function () {
    return gulp.src(config.src.css)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe($.concat('style.min.css'))
        .pipe($.cleanCss())
        .pipe($.sourcemaps.write("./"))
        .pipe(gulp.dest(config.dist.css));
});


/*
 * transpile  js files, bundle, uglify, and add source map to them
 */
gulp.task('js:dist', function () {
    return gulp.src(config.src.js)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.concat('common.min.js'))
        .pipe($.uglify())
        .pipe($.sourcemaps.write("./"))
        .pipe(gulp.dest(config.dist.js));
});


/*
 * monitor any change to re-run the tasks
 */
gulp.task('watch', function () {
    gulp.watch([config.src.html], ['html:dist']).on('change',browserSync.reload);
    gulp.watch([config.src.css], ['css:dist']);
    gulp.watch([config.src.js], ['js:dist']); 
    
});

gulp.task('copy:dist', ['html:dist', 'css:dist', 'js:dist']);


//Set a default tasks
gulp.task('default', ['copy:dist','watch'], function () {
    // place code for your default task here
});

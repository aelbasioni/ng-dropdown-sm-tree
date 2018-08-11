/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp");
var $ = require('gulp-load-plugins')();
var del = require('del');

/*
var browserSync = require('browser-sync').create();
browserSync.init({
    server: "./" //the path where index.html exists
});
browserSync.stream();
*/
var config = {
    src: {
        root: './src/',
        js: './src/js/*.js',
        css: ['./src/css/*.css', '!./src/css/*.min.css'],
        html: './*.html'
    },
    dist: {
        root: './dist/'       
    }
}


/*
 * clean dist folder
 */
gulp.task('clean', function (done) {
    del('./dist/*', done);
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
        .pipe($.concat('styles.min.css'))
        .pipe($.cleanCss())
        .pipe($.sourcemaps.write("./"))
        .pipe(gulp.dest(config.dist.root));
});


/*
 * transpile  js files, uglify, and add source map to them
 */
gulp.task('js:dist', function () {
    return gulp.src(config.src.js)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.uglify())
        .pipe($.concat('ng-dropdownsmtree.min.js'))
        .pipe($.sourcemaps.write("./"))
        .pipe(gulp.dest(config.dist.root));
});


/*
 * monitor any change to re-run the tasks
 */
gulp.task('watch', function () {    
    gulp.watch([config.src.css], ['css:dist']);
    gulp.watch([config.src.js], ['js:dist']); 
    //gulp.watch([config.src.html]).on('change',browserSync.reload).on('error',console.error.bind(console));
});

gulp.task('copy:dist', ['clean','css:dist', 'js:dist']);


//Set a default tasks
gulp.task('default', ['copy:dist','watch'], function () {
    // place code for your default task here
});

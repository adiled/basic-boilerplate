var path = require('path')
var del = require('del')
var gulp = require('gulp')
var concat = require('gulp-concat')
var filter = require('gulp-filter')
var sass = require('gulp-sass')

var minifyCss = require('gulp-minify-css')
var uglify = require('gulp-uglify')

var bower = require('main-bower-files')
var browserSync = require('browser-sync').create()

var base = {
    app: './app/',
    dist: './dist/',
}

gulp.task('default', gulp.parallel(scss, js, html, images))


// Watch for changes \\

gulp.task('watch', function() {
    console.log('serving')

    var watcher = gulp.watch(base.app+'**/*', gulp.series('default', browserSync.reload))

    watcher.on('change', function(evt) {

        console.log('Path: ' + evt + '| Type: '+evt.type)
        // console.log(path.relative('./',evt.path) + ' | type: '+evt.type)

        // if(evt.type==='deleted'){
        //     del(path.relative('./', evt.path)
        //         .replace(base.app.replace('./',''),base.dist.replace('./',''))
        //         .replace('src','assets'))
        // }
    })

    browserSync.init({
        server: base.dist
    });
})

gulp.task('serve', gulp.series('default', 'watch'))

function html() {
    return gulp.src(base.app+'*.html')
        .pipe(gulp.dest(base.dist))
}

function scss() {
    return gulp.src(base.app+'src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(base.dist+'assets/css'))
        .pipe(browserSync.stream())
}

function js() {
    return gulp.src(base.app+'src/js/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(base.dist+'assets/js'))
}

function images() {
    return gulp.src(base.app+'src/img/**/*')
        .pipe(gulp.dest(base.dist+'assets/img'))
        .pipe(browserSync.stream())
}

function cleanImages() {
    return del(base.dist+'assets/img')
}

gulp.task('clean-images', gulp.series(cleanImages, images))


// Bower Build \\

gulp.task('bower', gulp.parallel(vendorThemes, vendorScripts, vendorStyles, fonts),
    function(){
        console.log('\n=== Libraries Compiled ===\n')
})

function vendorThemes() {
    return gulp.src('bower_components/semantic/dist/themes/**/*')
        .pipe(gulp.dest(base.dist+'assets/lib/themes'))
}

function vendorScripts() {
    return gulp.src(bower())
        .pipe(filter('**/*.js'))
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(base.dist+'assets/lib'))
}

function vendorStyles() {
    return gulp.src(bower())
        .pipe(filter('**/*.css'))
        .pipe(concat('vendor.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(base.dist+'assets/lib'))
}

function fonts() {
    return gulp.src(base.app+'src/fonts/**/*')
        .pipe(gulp.dest(base.dist+'assets/fonts'))
}
const
    gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    browsersync = require('browser-sync').create();

const build = './build/';
const src = './src/';


const path = {
    build: {
        views: build,
        scripts: `${build}js/`,
        styles: `${build}css/`,
        images: `${build}images/`,
        fonts: `${build}fonts/`,
        bootsrapStyles: `${src}/css/libs.css`
    },
    src: {
        views: `${src}*.html`,
        scripts: `${src}js/*.js`,
        styles: `${src}styles/styles.less`,
        images: `${src}images/**/*.*`,
        fonts: `${src}fonts/**/*.*`,
        bootsrapStyles: `${src}styles/utils/*.css`
    }
};

gulp.task('styles', function () {
    return gulp.src(path.src.styles)
        .pipe(less())
        .pipe(gulp.dest(path.build.styles));
});

gulp.task('images', function () {
    return gulp.src(path.src.images)
        .pipe(gulp.dest(path.build.images));
});

gulp.task('fonts', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});


gulp.task('scripts', function () {
    return gulp.src('./src/js/main.js')
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('boottrapCss', function () {
    return gulp.src(path.src.bootsrapStyles)
        .pipe(concat('libs.css'))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('jsLibs', function () {
    return gulp.src([
        './src/js/bootstrap.bundle.min.js',
        './src/js/bootstrap.min.js'
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('html', function () {
    gulp.src(path.src.views)
        .pipe(gulp.dest(path.build.views));
});

var SYNC_CONFIG = {
    port: 3030,
    https: true,
    server: {
        // SUPPORT PORTAL:
        baseDir: './build'
        // index : 'support--bio.html'
        // index : 'support--content.html'
        // index : 'support--content-report.html'
        //
        // PRODUCT:
        // index : 'support--product.html'
        // index : 'support--product-container.html'
        // index : 'support--product-import.html'
        // index : 'support--search-results.html'
        //
        // SLS:
        // index : 'translation--content.html'
        // index : 'translation--tables.html'
        // index : 'translation--home.html'
    },
    open: true,
    notify: false
};

gulp.task('browsersync', function () {
    browsersync.init(SYNC_CONFIG);
    browsersync.watch('build', browsersync.reload())
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.less', ['styles']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/**/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'images', 'fonts', 'jsLibs', 'scripts', 'boottrapCss', 'watch', 'browsersync', 'html']);
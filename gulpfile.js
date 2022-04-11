const { src, dest, parallel, series, watch } = require('gulp');

const browserSync = require('browser-sync').create();

const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');

const imagecomp = require('compress-images');
const del = require('del');

const pug = require('gulp-pug');

function browsersync() {
    browserSync.init({
        server: { baseDir: 'dev/' },
        notify: false,
        online: true
    })
}

function scripts() {
	return src(['dev/scripts/script.js'])
	.pipe(concat('script.min.js'))
	.pipe(uglify())
	.pipe(dest('dev/scripts/'))
	.pipe(browserSync.stream())
}

function styles() {
	return src('dev/scss/style.scss')
	.pipe(sass())
	.pipe(concat('style.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }, format: 'beautify'} ))
	.pipe(dest('dev/css/'))
	.pipe(browserSync.stream())
}

async function images() {
	imagecomp(
		"dev/images/src/**/*",
		"dev/images/opt/",
		{ compress_force: false, statistic: true, autoupdate: true }, false,
		{ jpg: { engine: "mozjpeg", command: ["-quality", "80"] } },
		{ png: { engine: "pngquant", command: ["--quality=80-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) {
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
}

function cleanimg() {
	return del('dev/images/opt/**/*', { force: true })
}

function views() {
    return src('dev/pug/*.pug')
    .pipe(
      pug({
		pretty: true
	})
    )
    .pipe(dest('dev'));
}

function startwatch() {
	watch(['dev/**/*.js', '!dev/**/*.min.js'], scripts);
    watch('dev/**/*.scss', styles);
    watch('dev/**/*.pug', views).on('change', browserSync.reload);
    watch('dev/images/src/**/*', images);
}

function build() {
	return src([
		'dev/css/**/*.min.css',
		'dev/scripts/**/*.min.js',
		'dev/images/opt/**/*',
		'dev/fonts/*',
		'dev/*.html'
		], { base: 'dev' })
	.pipe(dest('dist'))
}
function cleandist() {
	return del('dist/**/*', { force: true })
}

exports.browsersync = browsersync;
exports.views = views;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.cleandist = cleandist;

exports.build = series(cleandist, views, styles, scripts, images, build);
exports.default = parallel(views, styles, scripts, browsersync, startwatch);
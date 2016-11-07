var gulp         = require('gulp'),
	browserSync  = require('browser-sync'),
	sass         = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	rename       = require('gulp-rename'),
	cleanCSS     = require('gulp-clean-css'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant');
	/*
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglifyjs'),
	*/

gulp.task('browser-sync', function(){
	return browserSync({
		server: {
			baseDir: './'
		},
		notify: false
	});
});

gulp.task('sass', function(){
	return gulp
		.src('sass/**/*.sass')
		.pipe(sass({
			outputStyle: 'expanded',
			includePaths: [require('node-bourbon').includePaths]
		}))
		.on('error', sass.logError)
		.pipe(autoprefixer({browsers: ['last 25 versions'], cascade: false}))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('renameCss', function(){
	return gulp
		.src(['css/*.css', '!css/min/*.min.css'])
		.pipe(rename({
			dirname: 'min',
			suffix: '.min'
		}))
		.pipe(gulp.dest('css'));
});

gulp.task('minifyCss', ['renameCss'], function(){
	return gulp
		.src(['css/min/*'])
		.pipe(cleanCSS({
			keepSpecialComments: 0
		}))
		.pipe(gulp.dest('css/min'));
});

gulp.task('start', ['sass', 'minifyCss', 'browser-sync'], function(){
	gulp.watch(['sass/**/*.sass'], ['sass']);

	gulp.watch('css/**/*.css', ['minifyCss']);
	gulp.watch('js/**/*.js').on('change', browserSync.reload);
	gulp.watch('img/**/*').on('change', browserSync.reload);
	gulp.watch('*.html').on('change', browserSync.reload);
})

gulp.task('imagemin', function() {
	return gulp.src('img/**/*')
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('img')); 
});

/*
gulp.task('compileJs', function(){
	gulp.src([
		'libs/jquery/dist/jquery.min.js',
		//'libs/magnific-popup/dist/jquery.magnific-popup.min.js'
	])
	.pipe(concat('libs.js'))
	//.pipe(uglify())
	.pipe(gulp.dest('js'));
});
*/
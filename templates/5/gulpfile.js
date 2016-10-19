var gulp         = require('gulp'),
	browserSync  = require('browser-sync'),
	sass         = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglifyjs');

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: './'
		},
		notify: false
	});
});

gulp.task('sass', function(){
	gulp
		.src('sass/**/*.sass')
		.pipe(sass({
			outputStyle: 'expanded',
			includePaths: [require('node-bourbon').includePaths]
		}))
		.on('error', sass.logError)
		.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('compileJs', function(){
	gulp.src([
		'libs/jquery/dist/jquery.min.js',
		//'libs/magnific-popup/dist/jquery.magnific-popup.min.js'
	])
	.pipe(concat('compiled.js'))
	//.pipe(uglify())
	.pipe(gulp.dest('js'));
});

gulp.task('compileJsIe', function(){
	gulp.src([
		"libs/es5-shim/es5-shim.min.js",
		"libs/html5shiv/dist/html5shiv.min.js",
		"libs/html5shiv/dist/html5shiv-printshiv.min.js",
		"libs/respond/dest/respond.min.js"
	])
	.pipe(concat('ie-compiled.js'))
	//.pipe(uglify())
	.pipe(gulp.dest('js'));
});

gulp.task('start', ['sass', 'browser-sync'], function(){
	gulp.watch(['sass/**/*.sass'], ['sass']);

	gulp.watch('js/**/*.js').on('change', browserSync.reload);
	gulp.watch('img/**/*').on('change', browserSync.reload);
	gulp.watch('*.html').on('change', browserSync.reload);
})
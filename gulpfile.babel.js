'use strict';

import gulp from 'gulp';
import gulputil from 'gulp-util';
import uglify from 'gulp-uglify';
import CSSclean from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import del from 'del';
import babel from 'gulp-babel';
import cache from 'gulp-file-cache';

let Cache = new cache();
let c = false;

gulp.task('default',['clean','js','html'/*,'watch'*/], () => {
	return gulputil.log('Gulp is using');
});

const DIR = {
	SRC : 'src',
	DEST : 'dist'
};
const SRC = {
	JS : DIR.SRC + '/**/*.js',
	HTML : DIR.SRC + '/**/*.html'
};

const DEST = {
	JS : DIR.DEST + '/',
	HTML : DIR.DEST + '/'
};

gulp.task('js', () => {
	if(c){
		return gulp.src(SRC.JS)
		.pipe(Cache.filter())
		.pipe(babel({
			presets:['es2015']
		}))
		.pipe(uglify())
		.pipe(Cache.cache())
		.pipe(gulp.dest(DEST.JS));
	}
	else{
		return gulp.src(SRC.JS)
		.pipe(babel({
			presets:['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest(DEST.JS));
	}
});

gulp.task('html', () => {
	if(c){
                return gulp.src(SRC.HTML)
                .pipe(Cache.filter())
		.pipe(htmlmin({collapseWhitespace:true}))
                .pipe(Cache.cache())
                .pipe(gulp.dest(DEST.HTML));
        }
        else{
        	return gulp.src(SRC.HTML)
                .pipe(htmlmin({collapseWhitespace:true}))
                .pipe(gulp.dest(DEST.HTML));
	}
});

gulp.task('clean', () => {
	c = false;
	return del.sync(['./dist/**/*.js','./dist/**/*.html']);
});

gulp.task('watch', () => {
	c = true;
	gulp.watch(SRC.JS, ['js']),
	gulp.watch(SRC.HTML, ['html'])
});

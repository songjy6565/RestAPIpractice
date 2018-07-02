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

gulp.task('default',[/*'clean',*/'js1','js2','js3','js4','html1'/*,'watch'*/], () => {
	return gulputil.log('Gulp is using');
});

const SRC = {
	JS1 : './*.js',
	JS2 : './router/*.js',
	JS3 : './lib/*.js',
	JS4 : './lib/middleware/*.js',
	HTML1 : './views/*.html'
};

const DEST = {
	JS1 : './dist',
	JS2 : './dist/router',
	JS3 : './dist/lib',
	JS4 : './dist/lib/middleware',
	HTML1 : './dist/views'
};

let Cache = new cache();

gulp.task('js1', () => {
	return gulp.src(SRC.JS1)
		.pipe(Cache.filter())
		.pipe(babel({
			presets:['es2015']
		}))
		.pipe(uglify())
		.pipe(Cache.cache())
		.pipe(gulp.dest(DEST.JS1));
});

gulp.task('js2', () => {
        return gulp.src(SRC.JS2)
		.pipe(Cache.filter())
		.pipe(babel({
			presets:['es2015']
		}))
                .pipe(uglify())
		.pipe(Cache.cache())
                .pipe(gulp.dest(DEST.JS2));
});

gulp.task('js3', () => {
        return gulp.src(SRC.JS3)
		.pipe(Cache.filter())
		.pipe(babel({
                        presets:['es2015']
                }))
                .pipe(uglify())
		.pipe(Cache.cache())
                .pipe(gulp.dest(DEST.JS3));
});

gulp.task('js4', () => {
        return gulp.src(SRC.JS4)
		.pipe(Cache.filter())
		.pipe(babel({
                        presets:['es2015']
                }))
                .pipe(uglify())
		.pipe(Cache.cache())
                .pipe(gulp.dest(DEST.JS4));
});

gulp.task('html1', () => {
        return gulp.src(SRC.HTML1)
		.pipe(Cache.filter())
                .pipe(htmlmin({collapseWhitespace:true}))
		.pipe(Cache.cache())
                .pipe(gulp.dest(DEST.HTML1));
});

gulp.task('clean', () => {
	return del.sync(['./dist/**/*.js','./dist/**/*.html']);
});

gulp.task('watch', () => {
	gulp.watch(SRC.JS1, ['js1']),
	gulp.watch(SRC.JS2, ['js2']),
	gulp.watch(SRC.JS3, ['js3']),
	gulp.watch(SRC.JS4, ['js4']),
	gulp.watch(SRC.HTML1, ['html1'])
});

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

gulp.task('default',['clean','js1','js2','js3','js4','html1','watch'], () => {
	return gulputil.log('Gulp is using');
});

const DIR = {
	SRC : 'src',
	DEST : 'dist'
};
const SRC = {
	JS1 : DIR.SRC + '/*.js',
	JS2 : DIR.SRC + '/router/*.js',
	JS3 : DIR.SRC + '/lib/*.js',
	JS4 : DIR.SRC + '/lib/middleware/*.js',
	HTML1 : DIR.SRC + '/views/*.html'
};

const DEST = {
	JS1 : DIR.DEST + '/',
	JS2 : DIR.DEST + '/router',
	JS3 : DIR.DEST + '/lib',
	JS4 : DIR.DEST + '/lib/middleware',
	HTML1 : DIR.DEST + '/views'
};

gulp.task('js1', () => {
	if(c){
		return gulp.src(SRC.JS1)
		.pipe(Cache.filter())
		.pipe(babel({
			presets:['es2015']
		}))
		.pipe(uglify())
		.pipe(Cache.cache())
		.pipe(gulp.dest(DEST.JS1));
	}
	else{
		return gulp.src(SRC.JS1)
		.pipe(babel({
			presets:['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest(DEST.JS1));
	}
});

gulp.task('js2', () => {
	if(c){
                return gulp.src(SRC.JS2)
                .pipe(Cache.filter())
                .pipe(babel({
                        presets:['es2015']
                }))
                .pipe(uglify())
                .pipe(Cache.cache())
                .pipe(gulp.dest(DEST.JS2));
        }
        else{
                return gulp.src(SRC.JS2)
                .pipe(babel({
                        presets:['es2015']
                }))
                .pipe(uglify())
                .pipe(gulp.dest(DEST.JS2));
        }
});

gulp.task('js3', () => {
	if(c){
                return gulp.src(SRC.JS3)
                .pipe(Cache.filter())
                .pipe(babel({
                        presets:['es2015']
                }))
                .pipe(uglify())
                .pipe(Cache.cache())
                .pipe(gulp.dest(DEST.JS3));
        }
        else{
                return gulp.src(SRC.JS3)
                .pipe(babel({
                        presets:['es2015']
                }))
                .pipe(uglify())
                .pipe(gulp.dest(DEST.JS3));
        }
});

gulp.task('js4', () => {
	if(c){
                return gulp.src(SRC.JS4)
                .pipe(Cache.filter())
                .pipe(babel({
                        presets:['es2015']
                }))
                .pipe(uglify())
                .pipe(Cache.cache())
                .pipe(gulp.dest(DEST.JS4));
        }
        else{
                return gulp.src(SRC.JS4)
                .pipe(babel({
                        presets:['es2015']
                }))
                .pipe(uglify())
                .pipe(gulp.dest(DEST.JS4));
        }
});

gulp.task('html1', () => {
	if(c){
                return gulp.src(SRC.HTML1)
                .pipe(Cache.filter())
		.pipe(htmlmin({collapseWhitespace:true}))
                .pipe(Cache.cache())
                .pipe(gulp.dest(DEST.HTML1));
        }
        else{
        	return gulp.src(SRC.HTML1)
                .pipe(htmlmin({collapseWhitespace:true}))
                .pipe(gulp.dest(DEST.HTML1));
	}
});

gulp.task('clean', () => {
	c = false;
	return del.sync(['./dist/**/*.js','./dist/**/*.html']);
});

gulp.task('watch', () => {
	c = true;
	gulp.watch(SRC.JS1, ['js1']),
	gulp.watch(SRC.JS2, ['js2']),
	gulp.watch(SRC.JS3, ['js3']),
	gulp.watch(SRC.JS4, ['js4']),
	gulp.watch(SRC.HTML1, ['html1'])
});

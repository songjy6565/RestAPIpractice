"use strict";var _gulp=require("gulp"),_gulp2=_interopRequireDefault(_gulp),_gulpUtil=require("gulp-util"),_gulpUtil2=_interopRequireDefault(_gulpUtil),_gulpUglify=require("gulp-uglify"),_gulpUglify2=_interopRequireDefault(_gulpUglify),_gulpCleanCss=require("gulp-clean-css"),_gulpCleanCss2=_interopRequireDefault(_gulpCleanCss),_gulpHtmlmin=require("gulp-htmlmin"),_gulpHtmlmin2=_interopRequireDefault(_gulpHtmlmin),_gulpImagemin=require("gulp-imagemin"),_gulpImagemin2=_interopRequireDefault(_gulpImagemin),_del=require("del"),_del2=_interopRequireDefault(_del),_gulpBabel=require("gulp-babel"),_gulpBabel2=_interopRequireDefault(_gulpBabel),_gulpFileCache=require("gulp-file-cache"),_gulpFileCache2=_interopRequireDefault(_gulpFileCache);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}_gulp2.default.task("default",["js1","js2","js3","js4","html1"],function(){return _gulpUtil2.default.log("Gulp is using")});var SRC={JS1:"./*.js",JS2:"./router/*.js",JS3:"./lib/*.js",JS4:"./lib/middleware/*.js",HTML1:"./views/*.html"},DEST={JS1:"./dist",JS2:"./dist/router",JS3:"./dist/lib",JS4:"./dist/lib/middleware",HTML1:"./dist/views"},Cache=new _gulpFileCache2.default;_gulp2.default.task("js1",function(){return _gulp2.default.src(SRC.JS1).pipe(Cache.filter()).pipe((0,_gulpBabel2.default)({presets:["es2015"]})).pipe((0,_gulpUglify2.default)()).pipe(Cache.cache()).pipe(_gulp2.default.dest(DEST.JS1))}),_gulp2.default.task("js2",function(){return _gulp2.default.src(SRC.JS2).pipe(Cache.filter()).pipe((0,_gulpBabel2.default)({presets:["es2015"]})).pipe((0,_gulpUglify2.default)()).pipe(Cache.cache()).pipe(_gulp2.default.dest(DEST.JS2))}),_gulp2.default.task("js3",function(){return _gulp2.default.src(SRC.JS3).pipe(Cache.filter()).pipe((0,_gulpBabel2.default)({presets:["es2015"]})).pipe((0,_gulpUglify2.default)()).pipe(Cache.cache()).pipe(_gulp2.default.dest(DEST.JS3))}),_gulp2.default.task("js4",function(){return _gulp2.default.src(SRC.JS4).pipe(Cache.filter()).pipe((0,_gulpBabel2.default)({presets:["es2015"]})).pipe((0,_gulpUglify2.default)()).pipe(Cache.cache()).pipe(_gulp2.default.dest(DEST.JS4))}),_gulp2.default.task("html1",function(){return _gulp2.default.src(SRC.HTML1).pipe(Cache.filter()).pipe((0,_gulpHtmlmin2.default)({collapseWhitespace:!0})).pipe(Cache.cache()).pipe(_gulp2.default.dest(DEST.HTML1))}),_gulp2.default.task("clean",function(){return _del2.default.sync(["./dist/**/*.js","./dist/**/*.html"])}),_gulp2.default.task("watch",function(){_gulp2.default.watch(SRC.JS1,["js1"]),_gulp2.default.watch(SRC.JS2,["js2"]),_gulp2.default.watch(SRC.JS3,["js3"]),_gulp2.default.watch(SRC.JS4,["js4"]),_gulp2.default.watch(SRC.HTML1,["html1"])});
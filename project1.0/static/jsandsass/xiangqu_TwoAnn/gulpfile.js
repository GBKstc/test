/**
 * Created by wjf55 on 2016/7/7.
 */
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    group = require('gulp-group-files'),
    minifycss = require('gulp-minify-css'),//css压缩
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名

    path={
        src:'dev',
        dest:'../../build/TwoAnn/dev'
    },
    srcImg ={
        src:path.src+'/image',
        dest:path.dest+'/image'
    },
    srcSass = {
        src:path.src+'/css',
        dest:path.dest+'/css'
    },
    srcJs = {
        src:path.src+'/js',
        dest:path.dest+'/js'
    };

gulp.task('sass', function () {
    gulp.src(srcSass.src+'/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(srcSass.dest))
        .pipe(minifycss())
        .pipe(rename({extname:'.min.css'}))
        .pipe(gulp.dest(srcSass.dest))
})
gulp.task('minJs', function () {
    gulp.src(srcJs.src+'/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(srcJs.dest))
})
gulp.task('concat',function(){
    gulp.src([srcJs.src+'/index.js',srcJs.src+'/share.js',srcJs.src+'/md5_zepto.js'])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(srcJs.dest))
        .pipe(uglify())
        .pipe(rename({extname:'.min.js'}))
        .pipe(gulp.dest(srcJs.dest))
})
gulp.task('watch', function () {
    gulp.watch([srcSass.src+'/*.scss',srcJs.src+'/*.js'],['default'])
})
gulp.task('default',['sass','minJs','concat']);











//gulp.task('clean',function(){
//    return gulp.src([srcSass.dest,srcJs.dest],{read:false}).pipe(clean({force:true}));
//
//});
//gulp.task('sass',function(){
//    return gulp.src([srcSass.src+'/index.scss',srcSass.src+'/share.scss'])
//        .pipe(sass({outputStyle:'expanded'}))
//        .pipe(gulp.dest(srcSass.dest))
//        .pipe(minifycss())
//        .pipe(rename({ extname: '.min.css' }))
//        .pipe(gulp.dest(srcSass.dest));
//});
//gulp.task('concat-js',function(){
//    return {
//        concatA:gulp.src(['../commons/js/fastclick/fastclick.js','../commons/js/zepto/zepto.js','../commons/js/zepto/ztouch.js','../commons/js/lazyload/lazyload.js'])
//            .pipe(concat('lib.js'))
//            .pipe(gulp.dest(srcJs.dest))
//            .pipe(uglify())
//            .pipe(rename({extname:'.min.js'}))
//            .pipe(gulp.dest(srcJs.dest)),
//        concatB:gulp.src(['../commons/js/fastclick/fastclick.js','../commons/js/zepto/zepto.js','../commons/js/template/template.js','../commons/js/zepto/ztouch.js','../commons/js/lazyload/lazyload.js'])
//            .pipe(concat('libtemp.js'))
//            .pipe(gulp.dest(srcJs.dest))
//            .pipe(uglify())
//            .pipe(rename({extname:'.min.js'}))
//            .pipe(gulp.dest(srcJs.dest))
//    }
//});
//gulp.task('js',function(){
//    return gulp.src([srcJs.src+'/index.js',srcJs.src+'/share.js',srcJs.src+'/md5_zepto.js'])
//        .pipe(gulp.dest(srcJs.dest))
//        .pipe(uglify())
//        .pipe(rename({ extname: '.min.js' }))
//        .pipe(gulp.dest(srcJs.dest));
//
//})
//
//gulp.task('image',function(){
//    return gulp.src([srcImg.src+'/*.png',srcImg.src+'/*.jpg'])
//        .pipe(gulp.dest(srcImg.dest));
//})
//
//gulp.task('watch',function(){
//    gulp.watch([path.src+'/css/*.scss',path.src+'/js/*.js'],['default']);
//});
//
//gulp.task('default',['clean'],function(){
//    gulp.start('sass','js','image','concat-js')
//});

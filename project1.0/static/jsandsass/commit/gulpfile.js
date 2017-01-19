/**
 * Created by Administrator on 2017/1/15.
 */
var gulp = require('gulp'),
    less = require('gulp-less'),
    imagemin = require('gulp-imagemin'),
    cssmin = require('gulp-clean-css'),
    cssver = require('gulp-make-css-url-vesion');
var imageminopt = {
    optimizationLevel:5,//类型：Number 默认：3 取值范围（0~7）优化等级
    progressive:true,//类型：Boolean 默认：false 无损压缩jpg图片
    interlaced:true,//类型：Boolean 默认：false 多次优化svg直到完全优化
}
var cssBuild = '../../build/commit/';
gulp.task('testLess',function(){
    gulp.src('css/index.less')
        .pipe(less())
        .pipe(gulp.dest(cssBuild+'css'));
});
gulp.task('testCssmin',function(){
    gulp.src(cssBuild+'css/index.css')
        .pipe(cssmin())//给CSS文件里引用文件加版本号（文件MD5）
        .pipe(cssver())
        .pipe(gulp.dest(cssBuild+'css/cssmin'));
})
gulp.task('testImg',function(){
    gulp.src('image/*.{png,jpg,gif,ico}')
        .pipe(imagemin(imageminopt))
        .pipe(gulp.dest(cssBuild+'image'));
})

gulp.task('default',['testLess','testImg','testCssmin']);
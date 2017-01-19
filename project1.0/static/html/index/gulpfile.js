/**
 * Created by Administrator on 2017/1/17.
 */
var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin');

gulp.task('testHtmlmin',function(){
    var options = {
        removeComments:true,//清楚注释
        collapseWhitespace:true,//压缩HTML
        collapseBooleanAttributes:true,//省略布尔属性的值
        removeEmptyAttributes:true,//删除所有空格作属性值
        removeScriptTypeAttributes:true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes:true,//删除<style>和<link>的type="test/css"
        minifyJS:true,//压缩页面JS
        minifyCSS:true//压缩页面CSS
    };
    gulp.src('*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('../../htmlBuild/index'));
})
gulp.task('default',['testHtmlmin']);
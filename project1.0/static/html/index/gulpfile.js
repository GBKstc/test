/**
 * Created by Administrator on 2017/1/17.
 */
var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin');

gulp.task('testHtmlmin',function(){
    var options = {
        removeComments:true,//���ע��
        collapseWhitespace:true,//ѹ��HTML
        collapseBooleanAttributes:true,//ʡ�Բ������Ե�ֵ
        removeEmptyAttributes:true,//ɾ�����пո�������ֵ
        removeScriptTypeAttributes:true,//ɾ��<script>��type="text/javascript"
        removeStyleLinkTypeAttributes:true,//ɾ��<style>��<link>��type="test/css"
        minifyJS:true,//ѹ��ҳ��JS
        minifyCSS:true//ѹ��ҳ��CSS
    };
    gulp.src('*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('../../htmlBuild/index'));
})
gulp.task('default',['testHtmlmin']);
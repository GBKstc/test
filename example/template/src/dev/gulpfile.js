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
    rename = require('gulp-rename'),//文件更名;
    //currDir = 'template',
    //branchName = 'time',
    path={
        src:'../dev',
        dest:'../../buildSrc',
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

gulp.task('clean',function(){
    return gulp.src([srcSass.dest,srcJs.dest],{read:false}).pipe(clean({force:true}));

});
gulp.task('sass',function(){
    return gulp.src([srcSass.src+'/index.scss'])
        .pipe(sass({outputStyle:'expanded'}))
        .pipe(gulp.dest(srcSass.dest))
        .pipe(minifycss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(srcSass.dest));
});
gulp.task('js',function(){
    return gulp.src([srcJs.src+'/index.js'])
        .pipe(gulp.dest(srcJs.dest))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(srcJs.dest));

})

gulp.task('image',function(){
    return gulp.src([srcImg.src+'/*.png',srcImg.src+'/*.jpg'])
        .pipe(gulp.dest(srcImg.dest));
})

gulp.task('watch',function(){
    gulp.watch([path.src+'/css/*.scss',path.src+'/js/*.js'],['default']);
});

gulp.task('default',['clean'],function(){
    gulp.start('sass','js','image')
});

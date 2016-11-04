var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();//引用browser-sync、创建restful服务器
var reload = browserSync.reload;//调用服务器的reload方法
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');


gulp.task('server',['sass'],function () {//给任务自定义一个名字
    browserSync.init({//初始化服务器
        server: "./",//配置服务器的运行目录
        startPath:'index.html'//初始页面
    });

    gulp.watch("index.html").on('change', reload);//监听文件，并触发reload方法
    gulp.watch("scss/*.scss",['sass']);//监听文件，并触发reload方法
});

gulp.task('sass',function () {
    gulp.src('scss/main.scss')
        .pipe(sass())
        .on('error',function(err){
            console.log(err.message);
        })
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}))
});

gulp.task('minjs',function(){
    /*gulp.src(['js/script1.js','js/script2.js'])//引入将要操作的文件到gulp流（类似于管道）
        .pipe(concat('concat.js'))//在pipe节点做相应的操作
        .pipe(uglify())
        .pipe(gulp.dest('minjs'));*/
});

gulp.task('clean',function () {
    gulp.src(['css','minjs'])
        .pipe(clean())
});





'use strict';

var gulp = require('gulp');
var fs = require('fs');
var sass = require('gulp-sass');
var less=require('gulp-less');
var gutil=require('gulp-util');
  var git = require('git-rev');
  var concatCss=require('gulp-concat-css');
  var cleanCSS=require('gulp-clean-css');
  var rename=require("gulp-rename");
  var p=require('./package.json');
    var argv = require('yargs').argv;
  var paths=p.paths;
  var message = 'salut';
  var includeStyles = '';

  gulp.task('lessy', function () {
    //return gulp.src('./src/scss/**/*.scss')
    //  .pipe(sass().on('error', sass.logError))
    //  .pipe(gulp.dest('./src/css/app.css'));
    gutil.log(gutil.colors.yellow('Compiling your less'));
    //var styles=paths.vendor.styles.concat(paths.src.styles);
    var styles=paths.src.styles.less;
    return gulp.src(styles)
      .pipe(less())
      .pipe(concatCss("app.less.css",{rebaseUrls:false}))
      .pipe(gulp.dest(paths.dev.styles));
  });

  gulp.task('modules-js', function () {

  });

  gulp.task('modules-css', function () {

  });

gulp.task('sassy', function () {
  //return gulp.src('./src/scss/**/*.scss')
  //  .pipe(sass().on('error', sass.logError))
  //  .pipe(gulp.dest('./src/css/app.css'));
  gutil.log(gutil.colors.yellow('Compiling your sass'));
  //var styles=paths.vendor.styles.concat(paths.src.styles);
  var styles=paths.src.styles.sass;
  return gulp.src(styles)
    .pipe(sass())
    //.pipe(gulp.dest(paths.dev.styles))
    //.pipe(gulp.dest('./dev/scss/**/*.css'))
    .pipe(concatCss("app.sass.css",{rebaseUrls:false}))
    .pipe(gulp.dest(paths.dev.styles));
});

gulp.task('sassy:watch', function () {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('git', function () {

  git.short(function (str) {
    console.log('short', str)
    // => aefdd94
  })

  git.long(function (str) {
    console.log('long', str)
    // => aefdd946ea65c88f8aa003e46474d57ed5b291d1
  })

  git.branch(function (str) {
    console.log('branch', str)
    // => master
  })

  git.tag(function (str) {
    console.log('tag', str)
    // => 0.1.0
  })
});

gulp.task('styles',['lessy','sass'],function(){

  gutil.log(gutil.colors.yellow('Styles'));
message = message + ' Jedi';
  gulp.src(paths.modules.styles)
    .pipe(gulp.dest(paths.dev.styles));

  return gulp.src(['dev/css/app.less.css','dev/css/app.sass.css'])
    .pipe(concatCss("app.css",{rebaseUrls:false}))
    .pipe(gulp.dest(paths.dev.styles))
    .pipe(cleanCSS())
    .pipe(rename("app.min.css"))
    .pipe(gulp.dest(paths.dist.styles));
});
gulp.task('write', function(cb){
//var js = document.createElement("script");

//js.type = "text/javascript";
//js.src = jsFilePath;
var fruits = [
  'document.writeln("<link href=\'dist/css/app.min.css\' rel=\'stylesheet\'>");',
  'document.writeln("<script type=\'text/javascript\' src=\'dist/js/app.min.js\'></script>");'
];
var energy = fruits.join("\n");

//document.body.appendChild(js);
  //fs.writeFile('includes.js', 'document.writeln("<script type=\'text/javascript\' src=\'dist/js/app.min.js\'></script>");', cb);
  fs.writeFile('includes.js', energy, cb);
//@import 'custom.css';
/*
var s = new MySuperObject();

Error : MySuperObject is undefined*/
});
gulp.task('build',['sass', 'less'] , function(cb){
  message = message+' Alex';
  if (argv.dist) {
    console.log('Dist!');
  } else {
    console.log('Dev!');
    console.log('Rewrite Files');
  }
  console.log(message);
});

gulp.task('sass', function () {
  gutil.log(gutil.colors.yellow('Compiling your sass'));
  message = message+' sith';
  //console.log(paths.src.styles.sass[0]);
  //console.log(paths.src.styles.sass.length);
  if (argv.dist) {
    return gulp.src(paths.src.styles.sass)
      .pipe(sass().on('error', sass.logError))
      .pipe(concatCss("app.sass.css",{rebaseUrls:false}))
      .pipe(gulp.dest(paths.dev.styles));
  } else {
    for (var i = 0; i < paths.src.styles.sass.length; i++) {
      gulp.src("./src/scss/" + paths.src.styles.sass[i])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dev.styles));

      console.log(paths.src.styles.sass[i]);
      includeStyles += "<link href='" + paths.src.styles.sass[i] + "' rel=\'stylesheet\'>\n";


    }
    /*return gulp.src(paths.src.styles.sass)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(paths.dev.styles));*/
  }
});

gulp.task('less', function () {
  gutil.log(gutil.colors.yellow('Compiling your less'));
  //console.log(paths.src.styles.less);
  if (argv.dist) {
    return gulp.src(paths.src.styles.less)
      .pipe(less())
      .pipe(concatCss("app.less.css",{rebaseUrls:false}))
      .pipe(gulp.dest(paths.dev.styles));
  } else {
    return gulp.src(paths.src.styles.less)
      .pipe(less())
      .pipe(gulp.dest(paths.dev.styles));
  }
});




gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

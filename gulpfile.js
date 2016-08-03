var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var htmlmin = require("gulp-htmlmin");
var header = require("gulp-header");
var browserSync = require("browser-sync").create();
var mainBowerFiles = require("main-bower-files");
var del = require("del");
var uglify = require("gulp-uglify");
var jshint = require('gulp-jshint');
var concat = require("gulp-concat");
var jsonminify = require("gulp-jsonminify");
var shell = require("gulp-shell");
var stripJsonComments = require('gulp-strip-json-comments');

var date = new Date();

//Config
var config = {
  name: "Josef Kuchař", //Fullname or nick
  company: "Josef Kuchař", //Can be your name
  email: "email@josefkuchar.cz",
  license: "Copyright (C) <%= company %> <%= year %> - GNU GLPv3 Licence"
}

//Base paths
var bases = {
  app: "app/",
  dist: "dist/",
};

//Run simple webserver for application
gulp.task("webserver", function() {
  gulp.src("app")
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
      fallback: "index.html",
    }));
});

// Delete the dist directory
gulp.task("clean", function(cb) {
  console.log("Cleaning production directory...");
  del([bases.dist], cb);
});

gulp.task("css", function() {
  return gulp.src(bases.app + "css/main.css")
    //.pipe(cssnano())
    .pipe(header("/* " + config.license + " \n */\n", {
      n: "\n * ",
      company: config.company,
      name: config.name,
      email: config.email,
      year: date.getFullYear()
    }))
    .pipe(gulp.dest(bases.dist + "css"))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("html", function() {
  return gulp.src(bases.app + "html/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(header("<!-- " + config.license + " \n  -->\n", {
      n: "\n  || ",
      company: config.company,
      name: config.name,
      email: config.email,
      year: date.getFullYear()
    }))
    .pipe(gulp.dest(bases.dist))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("img", function() {
  gulp.src(bases.app + "assets/img/*.png")
    .pipe(gulp.dest(bases.dist + "assets/img"))
    //Texture atlas json
  gulp.src(bases.app + "assets/img/*.json")
    .pipe(jsonminify())
    .pipe(gulp.dest(bases.dist + "assets/img"))
});

gulp.task("aseprite", shell.task(["aseprite -v -b --data sheet.json --sheet sheet.png  --sheet-width 42 --sheet-height 42 --filename-format {title}{frame} *.ase"], {
  cwd: bases.app + "assets/img/"
}));

gulp.task("bower", function() {

  //JS
  gulp.src(mainBowerFiles("**/*.js"))
    .pipe(uglify())
    .pipe(concat("libs.js"))
    .pipe(gulp.dest(bases.dist + "lib"))
    //CSS
  gulp.src(mainBowerFiles("**/*.css"))
    .pipe(cssnano())
    .pipe(concat("libs.css"))
    .pipe(gulp.dest(bases.dist + "lib"))
});

gulp.task("js", function() {
  return gulp.src(bases.app + "js/*")
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    //.pipe(uglify())

  //.pipe(header("/* " + config.license + " \n */\n", {
  //  n: "\n * ",
  //  company: config.company,
  //  name: config.name,
  //  email: config.email,
  //    year: date.getFullYear()
  //  }))
  .pipe(gulp.dest(bases.dist + "js"))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("font", function() {
  return gulp.src(bases.app + "assets/font/*")
    .pipe(gulp.dest(bases.dist + "assets/font"))
});

gulp.task("data", function() {
  return gulp.src(bases.app + "assets/data/*")
    .pipe(stripJsonComments())
    .pipe(jsonminify())
    .pipe(gulp.dest(bases.dist + "assets/data"))
});

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: bases.dist
    },
  })
});

gulp.task("favicon", function() {
  return gulp.src(bases.app + "assets/favicon/*")
    .pipe(gulp.dest(bases.dist))
});

gulp.task("watch", ['browserSync'], function() {
  gulp.watch(bases.app + "css/*", ["css"]);
  gulp.watch(bases.app + "html/*.html", ["html"]);
  gulp.watch(bases.app + "js/*", ["js"]);
  gulp.watch(bases.app + "assets/img/*", ["img"]);
  gulp.watch(bases.app + "assets/img/*.ase", ["aseprite"]);
  gulp.watch(bases.app + "assets/font/*", ["font"]);
  gulp.watch(bases.app + "assets/data/*", ["data"]);
  gulp.watch(bases.app + "assets/favicon/*", ["favicon"]);
});

gulp.task("default", ["html", "css", "js", "font", "data", "aseprite", "img", "favicon", "bower", "browserSync", "watch"]);

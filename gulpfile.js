const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');

const paths = {
  scripts: [
      "bower_components/jwt-decode/build/jwt-decode.min.js",
      "bower_components/hello/dist/hello.all.js",
      "bower_components/hello/dist/hello.js",
      "scripts/api-explorer-init.js",
      "scripts/api-explorer-helpers.js",
      "scripts/api-explorer-app.js",
      "scripts/api-explorer-svc.js",
      "scripts/loc_strings.js",
      "scripts/api-explorer-ctrl.js",
      "scripts/api-explorer-directive.js",
      "scripts/api-explorer-jseditor.js",
      "scripts/api-explorer-jsviewer.js",
      "scripts/api-explorer-msgraph.js",
      "scripts/auth.js",
      "scripts/postTemplates.js",
      "scripts/*.js"
    ],
    stylesheets: [
      "bower_components/components-font-awesome/css/font-awesome.min.css",
      "bower_components/angular-material/angular-material.min.css",
      "styles/api-explorer.css"
    ],
    assets: [
      './assets/**/*'
    ]
};

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(minify({
      mangle: false,
      ext:{
          src:'.js',
          min:'.min.js'
      }}))
    .pipe(gulp.dest('build/scripts'));
});

gulp.task('fonts', ['clean'], function() {
  return gulp.src(['./bower_components/components-font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}'])
    .pipe(gulp.dest('fonts/'));
});

gulp.task('assets', ['clean'], function() {
  return gulp.src(paths.assets)
    .pipe(gulp.dest('build/assets'));
});

gulp.task('stylesheets', ['clean'], function() {
  return gulp.src(paths.stylesheets)
    .pipe(concat('all.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.assets, ['scripts', 'stylesheets', 'assets'])
  gulp.watch(paths.scripts, ['scripts', 'stylesheets', 'assets']);
  gulp.watch(paths.stylesheets, ['scripts', 'stylesheets', 'assets']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'scripts', 'stylesheets', 'fonts', 'assets']);
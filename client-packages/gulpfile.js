const gulp = require("gulp");
const webpack = require("webpack-stream");
var gulpCopy = require('gulp-copy');
const path = require("path");

gulp.task("build", function() {
    return (gulp
            .src("src/index.ts")
            .pipe(webpack(require("./webpack.config")))
            .pipe(gulp.dest("dist")))
});

gulp.task("copy", function () {
   return gulp.src(["index.js"]).pipe(gulpCopy("dist"));
});

gulp.task("bundle", gulp.parallel('copy', "build"));

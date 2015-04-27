/**
 * Created by jrobison on 4/25/2015.
 */

var gulp = require("gulp");
var babel = require("babel");
var browserify = require("browserify");
var fs = require("fs");
var babelify = require("babelify");


gulp.task("build", function () {

    browserify({ debug: true })
        .transform(babelify)
        .require("./app/Application.jsx", { entry: true })
        .bundle()
        .on("error", function (err) { console.log("Error: " + err.message); })
        .pipe(fs.createWriteStream('./dist/reaction.js'));

    gulp.src("./app/index.html").pipe(gulp.dest("./dist"));
});

gulp.task("watch", function () {

    var watcher;
    watcher = gulp.watch(["./app/**/*.jsx", "./app/index.html"], ["build"]);

    watcher.on("change", function () {
        console.log("JSX Change detected, build kicked off");
    });
});

/**
 * Created by jrobison on 4/25/2015.
 */

var gulp = require("gulp");
var browserify = require("browserify");
var fs = require("fs");
var babelify = require("babelify");
var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish");
var chalk = require("chalk");
var jsxHint = require("jshint-jsx").JSXHINT;
var runSequence = require("run-sequence");
var server = require('./server/src/server');

gulp.task("build", function () {
    runSequence("lint", "browserify", ["index", "css"]);
});

gulp.task("index", function () {
    return gulp.src("./app/index.html").pipe(gulp.dest("./dist"));
});

gulp.task("css", function () {

    return gulp.src("./app/styles/reaction.css").pipe(gulp.dest("./dist"));
});

gulp.task("browserify", function () {
    return browserify({debug: true})
        .transform(babelify)
        .require("./app/scripts/view/Application.jsx", {entry: true})
        .bundle()
        .on("error", function (err) {
            console.log("Error: " + err.message);
        })
        .pipe(fs.createWriteStream('./dist/reaction.js'));
});

gulp.task("lint", function () {
    return gulp.src(['./app/**/*.js', './app/**/*.jsx'])
        .pipe(jshint({
            linter: jsxHint
        }))
        .
        pipe(jshint.reporter(stylish)).on("error", function (err) {
            console.log(err.toString());
        });
});

gulp.task("watch", function () {

    gulp.watch("./app/styles/*.css", ["css"]).on("change", function () {
        console.log(chalk.green.bold("CSS changed, build kicked off"));
    });

    gulp.watch("./app/index.html", ["index"]).on("change", function () {
        console.log(chalk.green.bold("index.html changed, build kicked off"));
    });

    gulp.watch(["./app/**/*.jsx", ".app/**/*.js"], ["build"]).on("change", function (event) {
        console.log(chalk.green.bold("File " + event.path + " changed, build kicked off"));
    });
});

gulp.task('startServer', function () {
    return server.start();
});

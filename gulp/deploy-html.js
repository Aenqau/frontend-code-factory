/* Jade */
var gulp = require('gulp'),
    config = require('./config'),
    prettify = require('gulp-prettify'),
    pug = require('gulp-pug'),
    newer = require('gulp-newer'),
    gutil = require('gulp-util'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    plumber = require('gulp-plumber'),
    fileinclude = require('gulp-file-include'),
    notify = require("gulp-notify");

gulp.task('deploy-pug', function() {
    return gulp.src(config.pathTo.Src.Html)
        .pipe(plumber({
            errorHandler: function(error) {
                notify({
                    title: 'Pug Error',
                    message: error.msg
                }).write(error);
                gutil.log(gutil.colors.red(error.message));
                this.emit('end');
            }
        }))
        .pipe(newer(config.pathTo.Deploy.Html))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(prettify({indent_size: 4}))
        .pipe(gulp.dest(config.pathTo.Deploy.Html))
        .pipe(reload({stream: true}));
});

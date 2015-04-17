var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var source_files = [
    "./src/module.js",
    "./src/provider.js",
    "./src/directive.js"
];

gulp.task('build', ['concat', 'minify']);

gulp.task('concat', function() {
    return gulp.src(source_files)
        .pipe(concat('angular-erated.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('minify', function() {
    return gulp.src(source_files)
        .pipe(concat('angular-erated.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'))
});

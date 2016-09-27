const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const exec = require('gulp-exec');
const concat = require('gulp-concat');

gulp.task('build', () => {
  gulp.src('./src/image-gallery.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
  gulp.src('./src/image-gallery.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('doc', () => {
  gulp.src('./src/image-gallery.js')
    .pipe(exec('./node_modules/documentation/bin/documentation.js build -f=md --shallow=true ./src/image-gallery.js -o ./docs/COMPONENT.md'));
  gulp.src(['./docs/COMPONENT.md', './docs/MAIN.md'])
    .pipe(concat('README.md'))
    .pipe(gulp.dest('.'));
});

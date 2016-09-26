const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const documentation = require('gulp-documentation');
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
    .pipe(documentation({ shallow: true, format: 'md', filename: 'COMPONENT.md' }))
    .pipe(gulp.dest('docs'));
  gulp.src(['./docs/COMPONENT.md', './docs/MAIN.md'])
    .pipe(concat('README.md'))
    .pipe(gulp.dest('.'));
});

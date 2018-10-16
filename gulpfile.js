const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const debug = require('debug')('gulpfilejs');

gulp.task('default', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 8000,
    },
    ignore: ['./node_modules/**'],
  })
    .on('restart', () => {
      debug('restarting...');
    });
});

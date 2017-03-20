var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var buffer = require('vinyl-buffer');
var merge = require('merge-stream');
var imagemin = require('gulp-imagemin');
var del = require('del');
var watch = require('gulp-watch')
var sh = require('shelljs');

var iconPath = './src/assets/images/icons';
var sassPath = './src/assets/scss/icons';

function watchSprites(path){
  watch(path, function () {
    sh.exec('gulp sprites');
    sh.exec('gulp move')
  });
}

gulp.task('watch', function () {
  console.log('正在监听精灵图...')
  watchSprites(iconPath + '/*.png')
  watchSprites(iconPath + '/*.jpg')
});

gulp.task('sprites', function () {
  var spriteData = gulp.src(iconPath + '/*.png').pipe(spritesmith({
    imgName: './assets/scss/icons/sprites.png',
    cssName: '_sprites.scss',
    padding: 6
    // algorithm: 'top-down',
    //cssFormat: 'sass'
  }));

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest(sassPath));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    //.pipe(csso())
    .pipe(gulp.dest(sassPath));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);

  //return spriteData.pipe(gulp.dest('.dist/css/'));
});

gulp.task('move', function () {
  gulp.src(sassPath+'/assets/scss/icons/*.png')
    .pipe(gulp.dest(sassPath));

  del([sassPath+'/assets']);
  console.log('重新生成成功')
})


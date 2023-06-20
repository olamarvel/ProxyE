const exec = require('child_process').exec
const { log } = require('console')
const gulp = require('gulp')
const babel = require('gulp-babel')
const css = require('gulp-clean-css')
const livereload = require('gulp-livereload')

gulp.task('html', () => {
 return gulp.src('src/index.html').pipe(gulp.dest('app/')).pipe(livereload())
})

gulp.task('css', () => {
 return gulp
  .src('src/**/*.css')
  .pipe(css())
  .pipe(gulp.dest('app/'))
  .pipe(livereload())
})

gulp.task('js', () => {
 return gulp
  .src(['main.js', 'src/**/*.js'])
  .pipe(babel())
  .pipe(gulp.dest('app/'))
  .pipe(livereload())
})

gulp.task('images', () => {
 return gulp
  .src('src/assets/*')
  .pipe(gulp.dest('app/assets'))
  .pipe(livereload())
})

gulp.task('electron', () => {
 const electron = exec(__dirname + '/node_modules/.bin/electron .').on(
  'close',
  () => process.exit()
 )
 electron.stdout.on('data', message => {
  console.log('Message from Child process: ' + message)
 })
 electron.stderr.on('data', message => {
  console.log('error Message from Child process: ' + message)
 })
 return electron
})

gulp.task('watch', async function () {
 livereload.listen()
 gulp.watch('src/**/*.html', gulp.series('html'))
 gulp.watch('src/**/*.css', gulp.series('css'))
 gulp.watch('src/**/*.js', gulp.series('js'))
 gulp.watch('src/assets/**/*', gulp.series('images'))
})
gulp.task('ewatch', () => {
 gulp.watch('/main.js', gulp.series('electron'))
})

gulp.task('build', gulp.series('html', 'css', 'js', 'images'))

gulp.task('start', gulp.series('build', 'electron'))

gulp.task('default', gulp.parallel('start', 'watch'))

gulp.task(
 'release',
 gulp.series('build', () => {
  const electronB = exec(__dirname + '/node_modules/.bin/electron-builder').on(
   'close',
   () => process.exit()
  )

  electronB.stdout.on('data', message => {
   console.log('Message from building process: ' + message)
  })
  electronB.stderr.on('data', message => {
   console.log('error Message from building process: ' + message)
  })
  return electronB
 })
)

gulp.task('make-icon', () => {
 const icon = exec(
  __dirname +
   '/node_modules/.bin/electron-icon-maker --input=' +
   __dirname +
   '/assets/logo.png --output=' +
   __dirname +
   '/build'
 ).on('close', () => process.exit())

 icon.stdout.on('data', message => {
  console.log('Message from icon building process: ' + message)
 })
 icon.stderr.on('data', message => {
  console.log('error Message from icon building process: ' + message)
 })
 return icon
})

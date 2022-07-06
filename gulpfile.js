import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemap from 'gulp-sourcemaps';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import svgo from 'gulp-svgo';
import svgstore from 'gulp-svgstore';
import del from 'del';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import concat from 'gulp-concat';

const source = "source";
const dist = 'build';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Scripts

const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}


// Images

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.mozjpeg({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'))
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(gulp.dest('build/img'))
}


// WebP

const createWebp = () => {
  return gulp.src(['source/img/**/*.{jpg,png}', '!source/img/icons/favicons/*.png'])
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('build/img'))
}


// svg optimizer

const svg = () => {
  return gulp.src(['source/img/**/*.svg', '!source/img/icons/sprite/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img/'))
}


// Sprite

const sprite = () => {
  return gulp.src('source/img/icons/sprite/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img/icons/'));
}


// Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/manifest.webmanifest'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

// Clean

export const clean = () => {
  return del('build');
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = () => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  )
)

// Default run

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
)

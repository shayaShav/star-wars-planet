const del = require('del');
const path = require('path');
const execFileSync = require('child_process').execFileSync;
//
const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');
const gulpSequence = require('gulp-sequence');
const gulpFilter = require('gulp-filter');
const gulpGitModified = require('gulp-gitmodified');
//
const gulpUseref = require('gulp-useref');
const wiredep = require('wiredep').stream;
const gulpRev = require('gulp-rev');
const gulpRevReplace = require('gulp-rev-replace');
//
const gulpSass = require('gulp-sass');
const gulpBabel = require('gulp-babel');
const gulpUglify = require('gulp-uglify');
//
const gulpAngularAnnotate = require('gulp-ng-annotate');
const gulpAngularTemplateCache = require('gulp-angular-templatecache');

/* SASS */

let sassProcess = function(options) {
    let settings = {
        outputStyle: 'compact',
        src: ['src/**/*.scss', '!src/**/_*'],
        dest: 'src',
        processOnlyChanged: false
    };

    Object.assign(settings, options);

    // Stream
    let sassStream = gulp.src(settings.src);

    // Filter stream by git changes
    if (settings.processOnlyChanged) sassStream = sassStream.pipe(gulpGitModified(['added', 'modified', 'renamed']));

    return sassStream
        .pipe(gulpPlumber())
        .pipe(gulpSass({
            outputStyle: settings.outputStyle
        }))
        .pipe(gulpPlumber.stop())
        .pipe(gulp.dest(settings.dest));
}

/* DEVELOP */

gulp.task('bower', () => {
    gulp.src('src/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('src'));
});

gulp.task('sass-all', () => {
    return sassProcess();
});

gulp.task('sass-changed', () => {
    return sassProcess({
        processOnlyChanged: true
    });
});

gulp.task('develop', ['build:html'], () => {
    // Watch Sass partials
    gulp.watch('src/**/_*', ['sass-all']);
    // Watch all other Sass files
    gulp.watch(['src/**/*.scss', '!src/**/_*'], (changedFile) => {
        console.log(`Change detect in ${path.basename(changedFile.path)}`);
        sassProcess({
            src: changedFile.path,
            dest: path.dirname(changedFile.path)
        })
    });
    // Watch templates
    gulp.watch('src/**/*.html', ['build:html']);
});

/* BUILD */

gulp.task('build:clean-pre', () => {
    return del(['dist/**/*', '!dist/app-config.js']);
});

gulp.task('build:clean-post', () => {
    return del('dist/temp/**');
});

gulp.task('build:html', () => {
    return gulp.src('src/modules/**/*.template.html')
        .pipe(gulpAngularTemplateCache('swp.templates-cache.js', {
            module: 'Swp',
            transformUrl: (url) => 'static/' + url
        }))
        .pipe(gulp.dest('src/modules/swp'));
});

gulp.task('build:sass', () => {
    return sassProcess({
        dest: 'dist/temp/css',
        outputStyle: 'compressed'
    });
});

gulp.task('build:index-js-css', ['build:sass'], () => {
    let cssFilter = gulpFilter(['**/*.css'], {
        restore: true
    });
    let vendorScriptsFilter = gulpFilter(['**/vendor.min.js'], {
        restore: true
    });
    let appScriptsFilter = gulpFilter(['**/app.min.js'], {
        restore: true
    });

    return gulp.src('src/index.html')
        .pipe(gulpUseref({
            transformPath: filePath => filePath.replace('/static', path.extname(filePath) != '.css' ? 'modules' : '../dist/temp/css/modules')
        }))
        .pipe(cssFilter)
        .pipe(gulpRev())
        .pipe(cssFilter.restore)
        //
        .pipe(vendorScriptsFilter)
        .pipe(gulpRev())
        .pipe(vendorScriptsFilter.restore)
        //
        .pipe(appScriptsFilter)
        .pipe(gulpBabel({
            presets: ['es2015']
        }))
        .pipe(gulpAngularAnnotate())
        .pipe(gulpUglify())
        .pipe(gulpRev())
        .pipe(appScriptsFilter.restore)
        //
        .pipe(gulpRevReplace())
        .pipe(gulp.dest('dist'))
});

gulp.task('build', () => {
    gulpSequence('build:clean-pre', 'build:html', 'build:index-js-css', 'build:clean-post')();
});

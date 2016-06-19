import * as chalk from 'chalk';
import * as del from 'del';
import * as gulp from 'gulp';
import * as loadPlugins from 'gulp-load-plugins';
import * as runSequence from 'run-sequence';
import * as util from 'gulp-util';
import {DIST_DIR, TYPINGS_DIR, APP_DIR, TEST_DIST, RELEASE_DIR} from './config';
import {join} from 'path';

let plugins: any = loadPlugins();

// compile typescript into individual files, project directory structure is replicated under www/build/test
function buildTypescript(): any {
  'use strict';

  let tsProject: any = plugins.typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
  });
  let src: Array<any> = [
    join(APP_DIR, '**/*.ts'),
    join(TYPINGS_DIR, '/index.d.ts')
  ];
  let result: any = gulp.src(src)
    .pipe(plugins.typescript(tsProject));

  result.dts.
    pipe(gulp.dest(DIST_DIR));

  return result.js
    .pipe(gulp.dest(DIST_DIR));
}

// delete everything used in our test cycle here
function clean(): any {
  'use strict';

  // You can use multiple globbing patterns as you would with `gulp.src`
  return del([DIST_DIR + '**/*', '!' + TEST_DIST, RELEASE_DIR + '**/*']).then((paths: Array<any>) => {
    util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
  });
}

// run tslint against all typescript
function lint(): any {
  'use strict';

  return gulp.src(join(APP_DIR, '**/*.ts'))
    .pipe(plugins.tslint())
    .pipe(plugins.tslint.report(plugins.tslintStylish, {
      emitError: false,
      sort: true,
      bell: true,
    }));
}

function copyStatic(): any {
  'use strict';
  return gulp.src([
    join(APP_DIR, '**/*'),
    '!' + join(APP_DIR, '**/*.ts')
  ]).pipe(gulp.dest(DIST_DIR));
}

function watcher(): any {
  'use strict';

  plugins.watch(join(APP_DIR, '**/*.ts'), () => {
    gulp.start('watch.build');
  });
}

gulp.task('build.typescript', buildTypescript);
gulp.task('clean', clean);
gulp.task('test.lint', lint);
gulp.task('static', copyStatic);
gulp.task('watch', watcher);

gulp.task('build', (done: any) => {
  runSequence(
    ['clean'],
    ['static'],
    'build.typescript',
    done
  );
});

// first time round we should nuke everything
gulp.task('watch.build', (done: any) => {
  runSequence(
    'build',
    'watch',
    done
  );
});


gulp.task('release', ['build'], (done: any) => {
  'use strict';
  return gulp.src([
    join(DIST_DIR, '**/*'),
    'www/package/package.json'
  ]).pipe(gulp.dest(RELEASE_DIR));
});

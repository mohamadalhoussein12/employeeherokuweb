const gulp = require('gulp');
const replace = require('gulp-replace');

const path = {
  local: {
    destination: "./constants.js",
    db: "mongodb://localhost:27017/employeeDb",
  },
  prod: {
    destination: "./constants.js",
    db: "mongodb+srv://admin:admin@cluster0.uuemx.mongodb.net/employeeDesk"
  },
};

/**
 * [setEnvironment change url db in constants file depending on environemnt
 * @param {[string]} env  [local or prod]
 * * local for local DATABASE
 * prod for mongo database hosted on atlas
 */
function setEnvironment(env) {
  console.log(`Setting environment to ${path[env].destination}`);
  return gulp
    .src(path[env].destination)
    .pipe(
      replace(
        /URL: (.*)/,
        `URL: '${path[env].db}',`
      )
    )
    .pipe(gulp.dest("./"))
}

gulp.task('set:local', () => setEnvironment('local'));

gulp.task('set:prod', () => setEnvironment('prod'));

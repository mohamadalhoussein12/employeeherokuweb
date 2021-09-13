const gulp = require('gulp');
const replace = require('gulp-replace');

const path = {
  local: {
    destination: "./src/constants.js",
    server: "http://locahost:3000/api",
  },
  prod: {
    destination: "./src/constants.js",
    server: "https://employeesdesk.herokuapp.com/api"
  },
};

/**
 * [setEnvironment change api url in constants file depending on environemnt
 * @param {[string]} env  [local or prod]
 * * local for local server
 * prod for server hosted on heroku
 */
function setEnvironment(env) {
  console.log(`Setting environment to ${path[env].destination}`);
  return gulp
    .src(path[env].destination)
    .pipe(
      replace(
        /SERVER_URL: (.*)/,
        `SERVER_URL: '${path[env].server}',`
      )
    )
    .pipe(gulp.dest("./src"))
}

gulp.task('set:local', () => setEnvironment('local'));

gulp.task('set:prod', () => setEnvironment('prod'));

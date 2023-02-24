function defaultTask(cb) {
  // Good article on Node Streams:
  // https://www.tutorialspoint.com/nodejs/nodejs_streams.htm
  const { src, dest, series, parallel } = require("gulp");
  /**
   * src() uses nodejs.ReadStream() and and returns a ReadWriteStream object
   * ( also known as file object).
   * bcuz it uses fs.createReadStream() behind the scenes.
   * Log the output u will find several ReadStream events.
   *
   * Streams are objects that let you read data from a source or write data to a destination
   * in continuous fashion. In Node.js, there are four types of streams −

    Readable − Stream which is used for read operation.

    Writable − Stream which is used for write operation.

    Duplex − Stream which can be used for both read and write operation.

    Transform − A type of duplex stream where the output is computed based on input.
   */
  //const srcRes = src("index.html", { debug: true });
  const srcRes = src("index.html");
  //console.log(srcRes);

  // using fileInclude npm package via gulp.
  const fileinclude = require("gulp-file-include");
  /**
   * It is a method of nodejs.ReadStream() which is called by "src()" function.
   * Piping is a mechanism where we provide the output of one stream as the input to another stream.
   */
  // dest() uses nodejs.WriteStream() and returns a ReadWriteStream Object.
  srcRes.pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    })).pipe(dest("./"));
  /**
   * If nothing is returned from your task, you must use the error-first callback
   * to signal completion. The callback will be passed to your task as the
   * only argument - named cb()
   */
  cb();
}

/**
 * NOTE
 * When you see the "Did you forget to signal async completion?" WARNING,
 * none of the techniques mentioned above were used.
 * You'll need to use the error-first callback or return a stream, promise,
 * event emitter, child process, or observable to resolve the issue.
 */


/**
 * you can define your task as an async function, which wraps your task in a promise.
 *  This allows you to work with promises synchronously using await
 * and use other synchronous code.
 */
const fs = require("fs");
async function asyncAwaitTask() {
  const { version } = await JSON.parse(fs.readFileSync("package.json", "utf8"));
  //console.log(version);
  //await Promise.resolve("some result");
  // asyn function so it returns a promise anyways. with a resolve(1);
}
exports.asyncTask = asyncAwaitTask;


//const { src, dest } = require('gulp');
// node.js format for default export.
exports.default = defaultTask

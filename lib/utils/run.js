/* jshint node: true */

var RSVP = require('rsvp');
var spawn = require('child_process').spawn;

function run(command, args, opts) {
  opts = opts || {};
  opts.stdio = 'inherit';
  return new RSVP.Promise(function(resolve, reject) {
    console.log('starting node');
    var p = spawn(command, args, opts);
    p.on('close', function(code){
      if (code !== 0) {
        reject(command + " exited with nonzero status");
      } else {
        resolve();
      }
    });
    p.on('error', function(err){
      reject(err);
    });
  });
}

module.exports = run;

/* jshint node: true */

var RSVP = require('rsvp');
var spawn = require('child_process').spawn;

function run(command, args, opts) {
  opts = opts || {};
  opts.stdio = 'inherit';
  return new RSVP.Promise(function(resolve, reject) {
    console.log('starting ' + command);
    console.dir(args);
    var p = spawn(command, args, opts);
    p.on('close', function(code){
      console.log('closing!' + code);
      if (code !== 0) {
        reject(command + " exited with nonzero status");
      } else {
        resolve();
      }
    });
    p.on('error', function(err){
      console.log('error!' + err);
      reject(err);
    });
    p.on('exit', function(){
      console.log('exiting!');
      console.dir(arguments);
    });
  });
}

module.exports = run;

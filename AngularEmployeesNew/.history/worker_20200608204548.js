var registerPromiseWorker = require('promise-worker/register');

registerPromiseWorker(function (message) {
    //console.log('Worker method.. ' + message );
  return 'pong';
});
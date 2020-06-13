var registerPromiseWorker = require('promise-worker/register');

registerPromiseWorker(function (message) {
    console.log();
  return 'pong';
});
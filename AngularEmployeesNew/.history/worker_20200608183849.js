var registerPromiseWorker = require('promise-worker/register');

registerPromiseWorker(function (message) {
  return 'pong';
});
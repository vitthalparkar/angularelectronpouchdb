// var registerPromiseWorker = require('promise-worker/register');

// registerPromiseWorker(function (message) {
//     //console.log('Worker method.. ' + message );
//   return 'pong';
// });
var PouchDB = require('pouchdb-browser');
const { MessageChannel, receiveMessageOnPort } = require('worker_threads');
const { port1, port2 } = new MessageChannel();
port1.on('message', (message) => {
  var db = new PouchDB('employee');
  console.log();
});
port2.postMessage({ foo: 'bar' });

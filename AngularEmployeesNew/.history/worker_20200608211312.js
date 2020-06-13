// var registerPromiseWorker = require('promise-worker/register');

// registerPromiseWorker(function (message) {
//     //console.log('Worker method.. ' + message );
//   return 'pong';
// });
var PouchDB = require('pouchdb-browser');
const { MessageChannel, receiveMessageOnPort } = require('worker_threads');
const { port1, port2 } = new MessageChannel();
port1.on('message', (message) => {
  console.log('Db start creating');
  // var db = new PouchDB('employee');
  // var replicationStream = require('pouchdb-replication-stream');
  // PouchDB.plugin(replicationStream.plugin);
  // PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);
  // var fs = require('fs');
  console.log('Db created');
});
port2.postMessage({ foo: 'bar' });

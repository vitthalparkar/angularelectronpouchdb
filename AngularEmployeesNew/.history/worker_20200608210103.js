// var registerPromiseWorker = require('promise-worker/register');

// registerPromiseWorker(function (message) {
//     //console.log('Worker method.. ' + message );
//   return 'pong';
// });

const { MessageChannel, receiveMessageOnPort } = require('worker_threads');
const { port1, port2 } = new MessageChannel();
port1.on('message', (message) => console.log('received', message));
port2.postMessage({ foo: 'bar' });

// var registerPromiseWorker = require('promise-worker/register');

// registerPromiseWorker(function (message) {
//     //console.log('Worker method.. ' + message );
//   return 'pong';
// });

const { MessageChannel, receiveMessageOnPort } = require('worker_threads');
const { port1, port2 } = new MessageChannel();
port1.postMessage({ hello: 'world' });

console.log(receiveMessageOnPort(port2));
// Prints: { message: { hello: 'world' } }
console.log(receiveMessageOnPort(port2));
// Prints: undefined
import registerPromiseWorker from 'promise-worker/register';

registerPromiseWorker((message) => {
    console.log(message);
});
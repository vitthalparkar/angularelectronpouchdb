const {app, BrowserWindow, ipcMain} = require('electron')
const url = require("url");
const path = require("path");
var load = require('pouchdb-load');
var replicationStream = require('pouchdb-replication-stream');
var fs = require('fs');
var PouchDB = require('pouchdb');
var indexeddbprovide = require('pouchdb-adapter-indexeddb');
var PromiseWorker = require('promise-worker');
const {  Worker, isMainThread, parentPort } = require('worker_threads');


PouchDB.plugin(replicationStream.plugin);
PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);
PouchDB.plugin(indexeddbprovide);

    let mainWindow
    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          nodeIntegrationInWorker: true
        }
      })

      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `/dist/index.html`),
          protocol: "file:",
          slashes: true
        })
      );
      function openModalNew(){
        console.log('openModalNew');
        if (isMainThread) { 
          console.log('isMainThread');
          const worker = new Worker('./worker.js');
         
          worker.once('message', (message) => {
            console.log(message);  // Prints 'Hello, world!'.
          });
          console.log('worker');
          worker.postMessage('Hello, world!');
        } else {
          parentPort.once('message', (message) => {
            parentPort.postMessage(message);
          });
        }
      };


      function openModal(){
       console.log('Open modal in main.js');
      //  PouchDB.plugin(require('pouchdb-adapter-indexeddb'));
      //  var db = new PouchDB('employees', {adapter: 'indexeddb'});
      //  var ws = fs.createWriteStream('output.txt');
      //  db.dump(ws).then(function (res) {
      //   console.log('Backup created ........');
      //  }).catch(function (err) {
      //   console.log(err);
      //  });
      var worker = new Worker('./worker.js');
      var promiseWorker = new PromiseWorker(worker);
      promiseWorker.postMessage('ping').then(function (response) {
       console.log('Reply from worker process........');
       console.log(response);
      }).catch(function (error) {
        console.log(error);
      });

      };
      ipcMain.on('openModal', (event, arg) => {
        openModalNew()
      });
      
      // Open the DevTools.
      // mainWindow.webContents.openDevTools()

      // mainWindow.on('closed', function () {
      //   mainWindow = null
      // })
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })
console.log('Backing up');
var PouchDB = require('pouchdb-browser');
var fs = require('fs');
const idBackup = document.getElementById('idBackup');
idBackup.addEventListener('click', function (event) {

console.log('button clicked');
      
var db = new PouchDB('employees');
var replicationStream = require('pouchdb-replication-stream');
PouchDB.plugin(replicationStream.plugin);
PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);

var fs = require('fs');

var ws = fs.createWriteStream('output.txt');
db.dump(ws).then(function (res) {

const zlib = require('zlib');
const gzip = zlib.createGzip();
const inp = fs.createReadStream('output.txt');
const out = fs.createWriteStream('output.txt.gz');
var stream = inp.pipe(gzip).pipe(out);

stream.on('finish', function () { 
    console.log('Backup created ........');
    fs.unlink('output.txt', function (err) {
        if (err) throw err;
        console.log('File deleted!');
        alert('Backup created ........');
    }); 
});

}).catch(function (err) {
console.log(err);
});

});
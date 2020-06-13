
  console.log('Restoring......');
  const idRestore = document.getElementById('idRestore');
  var PouchDB = require('pouchdb-browser');
  var load = require('pouchdb-load');

  idRestore.addEventListener('click', function (event) {
  var db = new PouchDB('employees');
  console.log('Restore started');
  const zlib = require('zlib');    
  const unzip = zlib.createUnzip();  
  const fs = require('fs');  
  const inp = fs.createReadStream('output.txt.gz');  
  const out = fs.createWriteStream('output.txt');  
  console.log(inp);
  var stream = inp.pipe(unzip).pipe(out); 
  stream.on('finish', function () { 
          
      fs.readFile('output.txt', 'utf8', function (err,data) {
          PouchDB.plugin(load);
          console.log('File reading is done');
          var replicationString = '';
          if (err) {
          return console.log(err);
          }
          console.log(data);
          replicationString =  data;
          console.log(replicationString);
          db.load(replicationString).then(function (res) {
              console.log(res);
              fs.unlink('output.txt', function (err) {
                  if (err) throw err;
                  console.log('File deleted!');
                  alert('Database restored ........');
              }); 
          }).catch(function (err) {
              console.log(err);
          });
      });
  });
  });

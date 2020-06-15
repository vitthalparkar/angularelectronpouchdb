var restoreBackup = require('restorebackupindexeddb');

const idRestore = document.getElementById('idRestore');
idRestore.addEventListener('click', function (event) {
    restoreBackup.StartRestoringBackup('employees', 'output.txt');
    console.log('you clicked button...');
});

  


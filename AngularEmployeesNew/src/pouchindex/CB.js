var createBackup = require('createbackupindexeddb');

const idBackup = document.getElementById('idBackup');
idBackup.addEventListener('click', function (event) {
    createBackup.StartCreatingBackup('employees', 'output.txt');
    console.log('you clicked button...');
});

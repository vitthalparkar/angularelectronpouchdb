import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import {EmployeePouchDB} from './EmployeePouchDB.Service';
import {DeleteEmployee, Employee} from './EmployeeModels';
import { EmployeeComponent } from './employee/employee/employee.component';
import { IpcRenderer } from 'electron';
import PouchDB from 'pouchdb';
import * as fs from 'fs';
import { replication } from 'pouchdb-replication-stream';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public progress: string = "no progress";

  employees_data: any = [];
  deleteElement: DeleteEmployee;
  selectedEmployee : Employee;
  title = 'Employee';
  displayedColumns: string[] = ['emp_name','emp_age','emp_address','emp_contact'];
  ipc: IpcRenderer
  constructor(
    private employeePouchDB: EmployeePouchDB,
    private dialog: MatDialog
  ) { 
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
    }
  }

  ngOnInit(){
    this.loadAllEmployees();
  }
  createBackupFile(){
    this.employeePouchDB.createBackupFile();
  }
  openModal(){
    // console.log("Open a modal");
    // this.ipc.send("openModal");
    
    PouchDB.plugin(replication.plugin);
    PouchDB.adapter('writableStream', replication.adapters.writableStream);
    const db = new PouchDB('employee');
    const ws = fs.createWriteStream('output.txt');

    db.dump(ws).then(function (res) {
      console.log('file created');
    }).catch(function (err) {
      console.log(err);
    });
    
  }
  loadAllEmployees(){
   //this.employeePouchDB.getEmployees();
		this.employeePouchDB
    .getEmployees()
    .then(
      ( employee: Employee[] ) : void => {
        this.employees_data = employee;
      },
      ( error: Error ) : void => {
        console.log( "Error", error );
      }
    );
  }
  ngOnDestroy(){    
  }
  openAddEmployeePopup(){
    this.selectedEmployee = new Employee('', '', '', '','');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '500px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      element: this.selectedEmployee,
      loadAllEmployees: () => { this.loadAllEmployees() }
    };
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  openDeleteEmployeePopup(element) {
    if(confirm("Are you sure to delete ")) {
      // console.log(element);
      // this.deleteElement = new DeleteEmployee('', '');
      // this.deleteElement._id = element.id;
      // this.deleteElement._rev = element.value.rev
      // this.employeeService.deleteEmployee(this.deleteElement);
    }
  }
  openEditEmployeePopup(element){
    // debugger;
    // console.log(element);
    // this.selectedEmployee = new Employee(element.id, 
    //   element.value.rev ,
    //   element.value.emp_name, 
    //   element.value.emp_age, 
    //   element.value.emp_address, 
    //   element.value.emp_contact);
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.height = '500px';
    // dialogConfig.width = '600px';
    // dialogConfig.data = {
    //   element: this.selectedEmployee,
    //   loadAllEmployees: () => { this.loadAllEmployees() }
    // };
    // this.dialog.open(EmployeeComponent, dialogConfig);
  }
}

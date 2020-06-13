import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HttpClient, HttpParams } from '@angular/common/http';
import {EmployeePouchDB} from '../../EmployeePouchDB.Service';
import {Employee} from '../../EmployeeModels';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  addEmployeeForm: FormGroup;
  selectedEmploye : Employee;
  loadAllEmployeesTrigger : any;
  employee: Employee;
  eventType;
  formMode;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeComponent>,
    private http: HttpClient,
    private employeePouchDB: EmployeePouchDB,
    private _snackBar: MatSnackBar, 
    @Inject(MAT_DIALOG_DATA) data
    ) {
      debugger;
      this.selectedEmploye = data.element;
      if(this.selectedEmploye._id.trim() == ''){
        this.eventType = 'save';
        this.formMode = 'Add Employee';
        this.addEmployeeForm = fb.group({
          emp_name: ['', [Validators.required]],
          emp_age: ['', Validators.required],
          emp_address: ['', Validators.required],
          emp_contact: ['', Validators.required]
        });
      }else{
        this.eventType = 'update';
        this.formMode = 'Update Employee';
        this.addEmployeeForm = fb.group({
          emp_name: [this.selectedEmploye.emp_name, Validators.required],
          emp_age:  [this.selectedEmploye.emp_age, Validators.required],
          emp_address: [this.selectedEmploye.emp_address, Validators.required],
          emp_contact: [this.selectedEmploye.emp_contact, Validators.required],
        });
      }
      
      this.loadAllEmployeesTrigger = data.loadAllEmployees;

    }

  ngOnInit(): void {
  }

  createEmployee(){
    debugger;
    const submitData = this.addEmployeeForm.value;
    this.employee = new Employee('', '', '', '','');
    this.employee.emp_name = (submitData.emp_name).trim();
    this.employee.emp_age =  (submitData.emp_age).trim();
    this.employee.emp_contact =  (submitData.emp_contact).trim();
    this.employee.emp_address =  (submitData.emp_address).trim();

		this.employeePouchDB
			.addEmployee( this.employee  )
			.then(
				( id: string ) : void => {
          debugger;
          this._snackBar.open('Employee added Successfully.', '', {
            duration: 3000,
          });
          this.close()
				},
				( error: Error ) : void => {
          debugger
					console.log( "Error:", error );
				}
      );
      this.loadAllEmployeesTrigger();
  }

  updateEmployee(){
    // debugger;
    // const submitData = this.addEmployeeForm.value;
    // this.employee = new Employee('', '', '', '','','');
    // this.employee._id = this.selectedEmploye._id;
    // this.employee._rev = this.selectedEmploye._rev;
    // this.employee.emp_name = (submitData.emp_name).trim();
    // this.employee.emp_age =  (submitData.emp_age).trim();
    // this.employee.emp_contact =  (submitData.emp_contact).trim();
    // this.employee.emp_address =  (submitData.emp_address).trim();

    // this.EmployeeService.updateEmployee(this.employee)
    // .subscribe((res) => {
    //   debugger;
    //   this._snackBar.open('Employee updated Successfully.', '', {
    //     duration: 3000,
    //   });
    // }, (err) => {
    //   this._snackBar.open('Employee updation Failed. ' + err.error.message, '', {
    //     duration: 3000,
    //   });
    // }, () => {
    //   if (this.eventType === 'update') {
    //     this.dialogRef.close();
    //   } else {
    //     this.addEmployeeForm.reset();
    //    // this.addEmployeeForm.get('enabledInd').patchValue(true);
    //   }

    //   this.loadAllEmployeesTrigger();
    // });
  }
  createUpdateEmployee(){
    debugger;
    if (this.eventType === 'save') {
      this.createEmployee();
    }else{
      this.updateEmployee();
    }
  }
  close() {
    this.dialogRef.close();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.addEmployeeForm.controls[controlName].hasError(errorName);
  }

  cleanForm(formGroup) {
    Object.keys(formGroup.controls).forEach((key) => formGroup.get(key).setValue(formGroup.get(key).value.trim()));
  }

}

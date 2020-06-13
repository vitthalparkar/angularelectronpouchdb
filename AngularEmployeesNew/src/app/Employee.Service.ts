import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { BehaviorSubject, throwError } from 'rxjs';
import { map, finalize, catchError } from 'rxjs/operators';
@Injectable()
export class EmployeeService {

  private _getEmployeesUrl = "http://localhost:3000/";
  private _deleteEmployeesUrl = "http://localhost:3000/employee/delete";
  private _addEmployeesUrl = "http://localhost:3000/employee/add";
  private _updateEmployeesUrl = "http://localhost:3000/employee/update";
  employees_data = new BehaviorSubject([]);
  isloading = new BehaviorSubject<boolean>(false);
  private headers = new HttpHeaders;
  constructor(private http: HttpClient) { }

  
  createEmployee(employee) {
    debugger;
    return this.http
      .post(this._addEmployeesUrl,
        employee,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')}
        ).pipe(
          catchError((err) => {
            debugger;
            return throwError(err);
          }),
          map((res: any) => {
            debugger;
            return res;
          }
          )
        );
  }

  updateEmployee(employee) {
    debugger;
    return this.http
      .put(this._updateEmployeesUrl,
        employee,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')}
        ).pipe(
          catchError((err) => {
            debugger;
            return throwError(err);
          }),
          map((res: any) => {
            debugger;
            return res;
          }
          )
        );
  }



  deleteEmployee(element){
    this.http
    .post(this._deleteEmployeesUrl,element,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')}
        ).pipe(
      map((res: any) => {
        this.getEmployees();
        //this.employees_data.next(res);
        //this.orgAreaCount.next(res.data.totalElements);
      }
      ),
      finalize(() => {
        this.isloading.next(false);
      })
    ).subscribe();
  }
  getEmployees() {
    this.isloading.next(true);
    this.http
    .get(this._getEmployeesUrl).pipe(
      map((res: any) => {
        this.employees_data.next(res);
        //this.orgAreaCount.next(res.data.totalElements);
      }
      ),
      finalize(() => {
        this.isloading.next(false);
      })
    ).subscribe();
  }
  reset() {
    this.employees_data.next([]);
  }
}
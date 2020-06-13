import { Injectable } from '@angular/core';
import {Employee} from './EmployeeModels';
import PouchDB from 'pouchdb';
import pouchLoad from 'pouchdb-load';
//PouchDB.plugin(pouchLoad);
//import saveAs from 'file-saver';
//var fs = require('fs');
// import dump from 'pouchdb-dump-select';
//import * as fse  from 'fs-extra';
//import { MemoryStream  } from 'MemoryStream';

interface IPouchDBAllDocsResult {
	offset: number;
	total_rows: number;
  rows: IPouchDBRow[];
}

interface IPouchDBRow {
	id: string;
	key: string;
	value: { rev: string };

	// Only included if include_docs is set to true during query.
	doc?: any;
}

interface IPouchDBPutResult {
	ok: boolean;
	id: string;
	rev: string;
}

@Injectable()
export class EmployeePouchDB {
	private pouch: any;
  constructor() {
    this.pouch = new PouchDB('employees');
    }
  
	public createBackupFile(){
		debugger;
		//var ws = new writeFileSync();
		//let ws = new WriteStream();
		//let stream = new MemoryStream()
		// stream.on('data', function(chunk) {
		//   dumpedString += chunk.toString();
		// });
		// this.pouch.dump(stream).then(function (res) {
		// 	// res should be {ok: true}
		// 	debugger
		//   });
	}
	// I add a new friend with the given name. Returns a promise of the generated id.
	public addEmployee( employee: Employee ) : Promise<string> {
	employee._id =  ( new Date() ).getTime().toString();
		var promise = this.pouch
			.put(employee)
			.then(res => {
				console.log(res);
				return res;
			});
		return( promise );
  }
	public getEmployees() : Promise<Employee[]> {
		var promise = this.pouch
			.allDocs({
				include_docs: true
			})
			.then(
				( result: IPouchDBAllDocsResult ) : Employee[] => {
					var friends = result.rows.map(
						( row: any ) : Employee => {
							return({
								_id: row.doc._id,
                emp_name: row.doc.emp_name,
                emp_age: row.doc.emp_age,
                emp_address: row.doc.emp_address,
                emp_contact: row.doc.emp_contact
							});
						}
					);
					return( friends );
				}
			);
		return( promise );
	}
}

export class DeleteEmployee {
    constructor(
        public _id: string,
        public _rev: string,
    ) {}
}

export class Employee {
    constructor(
        public _id: string,
        //public _rev: string,
        public emp_name : string,
        public emp_age : string,
        public emp_address : string,
        public emp_contact : string 
    ) {}
}
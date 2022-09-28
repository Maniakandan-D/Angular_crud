export class Employee{
    id: string= '';
    empCode: any = '';
    name: string = '';
    email: string = '';
    designation: string = '';
    department: string = '';
    date: any;
    status: string = '';
    salary: any;
}

export class EmployeeVM  extends Employee{
    checked?: boolean;
  }
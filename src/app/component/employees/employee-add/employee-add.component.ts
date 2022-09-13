import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';
import { Employees } from '../shared/employee.model';


@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  employeeForm: Employees = {
    id: '',
    empCode: '',
    name :'',
    email : '',
    designation :'',
    department :'',
    date :'',
    status :'',
    salary :''
};

  constructor(private employeeService: EmployeeService,
    private router:Router) { }

  ngOnInit(): void {
  }
  
  addEmployee(){
    this.employeeService.addEmployee(this.employeeForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/employees"])
      },
      error:(err) => {
        console.log(err);
      }
    });
  }
  back(){
    this.router.navigate(['/employees']);
   }
}

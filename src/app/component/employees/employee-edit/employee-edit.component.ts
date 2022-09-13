import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employees } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employeeForm: Employees ={
    id: '',
    empCode: '',
    name :'',
    email : '',
    designation :'',
    department :'',
    date :[''],
    status :'',
    salary :[''],
};

  constructor(private route: ActivatedRoute,
    private router:Router,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = String(param.get('id'));
      this.getEmployeeById(id);
    });
  }
  getEmployeeById(id: string) {
    this.employeeService.getEmployeeById(id).subscribe((data) => {
      this.employeeForm = data;
    });
  }
  update() {
    this.employeeService.update(this.employeeForm)
    .subscribe({
      next:(data) => {
       //direct to employees
        this.router.navigate(["/employees"]);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
  cancel(){
    this.router.navigate(['/employees']);
   }
}

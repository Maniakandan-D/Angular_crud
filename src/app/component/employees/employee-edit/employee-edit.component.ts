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
<<<<<<< HEAD
  alert: boolean;
=======
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
  employeeForm: Employees ={
    id: '',
    empCode: '',
    name :'',
    email : '',
    designation :'',
    department :'',
    date :[''],
    status :'',
<<<<<<< HEAD
    salary :['']
=======
    salary :[''],
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
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
<<<<<<< HEAD
        
       //direct to employees
        this.router.navigate(["/employees"]);
        
      },
      error:(err) => {
        console.log(err);
        this.alert =true;
=======
       //direct to employees
        this.router.navigate(["/employees"]);
      },
      error:(err) => {
        console.log(err);
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
      }
    })
  }
  cancel(){
    this.router.navigate(['/employees']);
   }
<<<<<<< HEAD
     closeAlert(){
    this.alert = false;
  }
=======
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
}

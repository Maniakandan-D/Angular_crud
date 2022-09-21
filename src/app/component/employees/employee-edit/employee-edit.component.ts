import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employees } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { AlertService } from 'src/app/shared/alertService/alert.service';

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
    salary :['']
};

  constructor(private route: ActivatedRoute,
    private router:Router,
    private employeeService: EmployeeService,private notifyService : AlertService ) { }

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
        this.notifyService.showSuccess("employee updated successfully !!")
       //direct to employees
        this.router.navigate(["/employees"]);
        
      },
      error:(err) => {
        console.log(err);
        this.notifyService.showError("Something went wrong");
      }
    })
  }
  cancel(){
    this.router.navigate(['/employees']);
   }
}

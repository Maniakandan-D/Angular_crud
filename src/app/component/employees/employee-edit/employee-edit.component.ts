import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  
  employeeForm: Employee ={
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
    private employeeService: EmployeeService ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = String(param.get('id'));
      this.getById(id);
    });
  }

  getById(id: string): void {
    this.employeeService.getById(id).subscribe((data) => {
      this.employeeForm = data;
    });
  }

  cancel(): void{
    this.router.navigate(['/employees']);
   }
}

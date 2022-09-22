import { Component, OnInit } from '@angular/core';
import { Employees } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
 id: string;
 employees: Employees;
  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.employees = new Employees();
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getDetails(this.id)
    .subscribe({ 
      next:data => {
        this.employees = data;
      },error: error => console.log(error)
    });
  }
  
 employeeDetails(id: number){
    this.router.navigate(['employees/employee-view', id])
 }

 list(){
  this.router.navigate(['/employees']);
 }
}

import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  
 id: string;
 employees: Employee;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.employees = new Employee();
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getById(this.id)
    .subscribe({ 
      next:data => {
        this.employees = data;
      },error: error => console.log(error)
    });
  }
  
 employeeDetails(id: number): void{
    this.router.navigate(['employees/employee-view', id])
 }

 back(): void{
  this.router.navigate(['/employees']);
 }
}

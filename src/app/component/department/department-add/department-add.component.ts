import { Component, OnInit } from '@angular/core';
import { Department } from '../shared/department.model';
import { Router } from '@angular/router';
import { DepartmentService } from '../shared/department.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent implements OnInit {
  deptForm: Department = new Department();
  constructor(private departmentService: DepartmentService,
    private router:Router) { }

  ngOnInit(): void {
  }
  addDepartment(){
    //if code, name is valide then call this service
    this.departmentService.addDepartment(this.deptForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/department"])
      },
      error:(err) => {
        console.log(err);
      }
    });
  }
  back(){
    this.router.navigate(['/department']);
   }

}

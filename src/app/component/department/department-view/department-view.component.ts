import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../shared/department.service';
import { Department } from '../shared/department.model';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css']
})
export class DepartmentViewComponent implements OnInit {
  id: string;
  departments: Department;
  constructor(private route: ActivatedRoute, private departmentService: DepartmentService, private router: Router) { }

  ngOnInit(): void {
    this.departments = new Department();
    this.id = this.route.snapshot.params['id'];

    this.departmentService.getDetails(this.id)
    .subscribe(data => {
      this.departments = data;
    }, error => console.log(error));
  }
  departmentDetails(id: string){
    this.router.navigate(['department/department-view', id])
   }
   list(){
    this.router.navigate(['/department']);
   }
}

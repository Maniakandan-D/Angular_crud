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
  departmentData: Department;
  
  constructor(private route: ActivatedRoute, private departmentService: DepartmentService, private router: Router) { }

  ngOnInit(): void {
    this.departmentData = new Department();
    this.id = this.route.snapshot.params['id'];
    this.departmentService.getById(this.id)
    .subscribe({
      next: data => {
      this.departmentData = data;
    }
  });
  }

  departmentDetails(id: string): void{
      this.router.navigate(['department/department-view', id])
    }

   back(): void{
    this.router.navigate(['/department']);
   }
}

import { Component, OnInit } from '@angular/core';
import { Department } from '../shared/department.model';
import { Router } from '@angular/router';
import { DepartmentService } from '../shared/department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/alertService/alert.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})

export class DepartmentAddComponent implements OnInit {
  
  form!: FormGroup;
  deptForm: Department = new Department();

  constructor(private departmentService: DepartmentService,
    private router: Router, private formBuilder: FormBuilder,
    private notifyService: AlertService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      department: ['', [Validators.required]
      ],
    }, { updateOn: 'change' });
  }

  submitForm(): boolean {
    var department = this.form.get('department').value;
    this.departmentService.getByName(department).subscribe((data: any) => {
      if (data.length > 0) {
        this.notifyService.showWarning(`Department  ${department} already exists`)
      }
      else {
        this.departmentService.add(this.deptForm)
          .subscribe({
            next: (data : any) => {
              this.notifyService.showSuccess(`Department ${department} added successfully !!`)
              this.router.navigate(["/department"])
            },
          });
      }
    });
    return true;
  }

  back(): void {
    this.router.navigate(['/department']);
  }
}

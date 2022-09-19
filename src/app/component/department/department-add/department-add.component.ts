import { Component, OnInit } from '@angular/core';
import { Department } from '../shared/department.model';
import { Router } from '@angular/router';
import { DepartmentService } from '../shared/department.service';
<<<<<<< HEAD
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
=======
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent implements OnInit {
<<<<<<< HEAD
  
  form!: FormGroup;
  deptForm: Department = new Department();

  constructor(private departmentService: DepartmentService,
    private router:Router, private formBuilder: FormBuilder) {  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      departmentCode:  [ '', [Validators.required]
                         ],
      department: [ '', [Validators.required]
                     ],
    }, {updateOn: 'change' });
  }


  submitForm(){
    if(this.form.get('department').value ==''){
      return true;   
    }
    else
    {
      this.departmentService.addDepartment(this.deptForm)
      .subscribe({
        next:(data) => {
          this.router.navigate(["/department"])
        },
      });
      console.log(this.form.value)
      return true;
    }
    }
  back(){
    this.router.navigate(['/department']);
   }
=======
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

>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Designation } from '../../designation/shared/designation.model';
import { DesignationService } from '../../designation/shared/designation.service';
import { DepartmentService } from '../../department/shared/department.service';
import { Department } from '../../department/shared/department.model';
import { AlertService } from 'src/app/shared/alertService/alert.service';


@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  form!: FormGroup;
  designation: Designation[] = [];
  department : Department [] = [];

  employeeForm: Employee = {
    id: '',
    empCode: '',
    name: '',
    email: '',
    designation: '',
    department: '',
    date: '',
    status: '',
    salary: ''
  };

  constructor(private employeeService: EmployeeService,
    private router:Router, private formBuilder: FormBuilder, private designationService: DesignationService
    ,private departmentService: DepartmentService, private notifyService : AlertService) { }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
      empCode: this.formBuilder.control ('', Validators.required),
      name: this.formBuilder.control ('', Validators.required),
      email: this.formBuilder.control('', Validators.required),
      designation: this.formBuilder.control ('', Validators.required),
      department: this.formBuilder.control ('', Validators.required),
      date: this.formBuilder.control ('', Validators.required),
      status: this.formBuilder.control ('', Validators.required),
      salary: this.formBuilder.control ('', Validators.required),
    }, {updateOn: 'change' });

    this.getDesignation();
    this.getDepartment();
  }

  submitForm(): boolean{
    var empCode = this.form.get('empCode').value;
    this.employeeService.getByCode(empCode).
    subscribe((data: any) =>{
      if(data.length > 0){
        this.notifyService.showWarning("Employee code is already exists");
      }
      else{
        this.employeeService.add(this.employeeForm)
        .subscribe({
          next: (data: any) =>{
            this.notifyService.showSuccess("Employee added successfully !!")
            this.router.navigate(['/employees']);
          },
          error: (err: any) => {
          console.log(err);
          }
        });
      }
    });
      return true;
  }

  back(): void{
    this.router.navigate(['/employees']);
  }

  getDesignation(): void{
    this.designationService.getAll()
    .subscribe((data: Designation[]) => {
      this.designation = data;
    });
  }

  getDepartment(): void{
    this.departmentService.getAll()
    .subscribe((data: Department[]) => {
      this.department = data;
    });
  }
}


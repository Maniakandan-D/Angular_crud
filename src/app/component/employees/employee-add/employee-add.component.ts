import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';
import { Employees } from '../shared/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Designation } from '../../designation/shared/designation.model';
import { DesignationService } from '../../designation/shared/designation.service';
import { DepartmentService } from '../../department/shared/department.service';
import { Department } from '../../department/shared/department.model';


@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

 designation: Designation[] = [];
 department : Department [] = [];

  employeeForm: Employees = {
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

  form!: FormGroup;


  constructor(private employeeService: EmployeeService,
    private router:Router, private formBuilder: FormBuilder, private designationService: DesignationService
    , private departmentService: DepartmentService) { }

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
  submitForm(){
  if(this.form.get('empCode').value ==''){
    return true;
    
  }
  else
  {
    this.employeeService.addEmployee(this.employeeForm)
    .subscribe({
      next: (data) =>{
        this.router.navigate(['/employees']);
      },
      error: (err) =>{
        console.log(err);
      }
    });
    console.log(this.form.value)
    return true;
  }
  }
  back(){
  this.router.navigate(['/employees']);
  }
// Designation 
  getDesignation(){
    this.designationService.getDesignation()
    .subscribe(data => {
      this.designation = data;
    });
  }
  // Department
  getDepartment(){
    this.departmentService.getDepartment()
    .subscribe(data => {
     this.department = data;
    });
  }
}


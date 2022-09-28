import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router'; 
import { EmployeeService } from '../shared/employee.service';
import { first } from 'rxjs';
import { AlertService } from 'src/app/shared/alertService/alert.service';
import { Department } from '../../department/shared/department.model';
import { DepartmentService } from '../../department/shared/department.service';
import { Designation } from '../../designation/shared/designation.model';
import { DesignationService } from '../../designation/shared/designation.service';
import { Employee } from '../shared/employee.model';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Status } from '../../status/shared/status.model';
import { StatusService } from '../../status/shared/status.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})

export class AddEditComponent implements OnInit {

  designation: Designation[] = [];
  department : Department [] = [];
  status: Status[] = [];
  form!: FormGroup;
  id: string;
  isEmployee: boolean;
  loading = false;
  submitted = false;
  showAdd: boolean;
  showUpdate: boolean;

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

  
  constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService, 
    private notifyService: AlertService, private formBuilder: FormBuilder, private designationService: DesignationService, 
    private departmentService: DepartmentService, private statusService: StatusService) { }

  ngOnInit(): void {
    this.id =  this.route.snapshot.params['id'];
    this.isEmployee = !this.id;
    this.form = this.formBuilder.group({
      empCode: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],
      salary: ['', Validators.required],
    }, {updateOn: 'change' });
    this.getDesignation();
    this.getDepartment();
    this.getStatus();
    if (!this.isEmployee) {
      this.employeeService.getById(this.id)
          .pipe(first())
          .subscribe(x => this.form.patchValue(x));
    }
  }
 
  submitForm(): void{
    this.submitted = true;
        if (this.form.invalid) {
          return;
    }       
     this.loading = true;
    if (this.isEmployee) {
        var empCode = this.form.get('empCode').value;
        this.employeeService.getByCode(empCode).
        subscribe((data: any) =>{
          if(data.length > 0){
            this.notifyService.showWarning(`Employee ${empCode} code is already exists`);
          }
          else{
            this.createEmployee();
          }
        });
    }  
    else {
        this.updateEmployee();
    }
  }

   createEmployee(): boolean{
    this.employeeService.add(this.employeeForm)
    .subscribe({
      next: (data: any) =>{
        this.notifyService.showSuccess(`Employee added successfully !!`)
        this.router.navigate(['/employees']);
      },
      error: (err: any) => {
        this.notifyService.showError("Something went wrong during employee added");
        this.loading = false;
      }
    });
    return true;
  }

  updateEmployee(): void{
   this.employeeService.update(this.id, this.employeeForm)
      .pipe(first())
      .subscribe({
          next: (data: any) => {
            console.log(data)
              this.notifyService.showSuccess(`Employee updated successfully..!!`);
              this.router.navigate(["/employees"]);
          },
          error: (error: any) => {
              this.notifyService.showError("Something went wrong during employee updated");
              this.loading = false;
          }
      });
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

  getStatus(): void{
    this.statusService.getAll()
    .subscribe((data: Status[]) =>{
    this.status = data;
    });
  }
}

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import {  Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/alertService/alert.service';
import { Department } from '../../department/shared/department.model';
import { DepartmentService } from '../../department/shared/department.service';
import { Designation } from '../../designation/shared/designation.model';
import { DesignationService } from '../../designation/shared/designation.service';
import { Status } from '../../status/shared/status.model';
import { StatusService } from '../../status/shared/status.service';
import { Employee, EmployeeVM } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

import { AddEditComponent } from './add-edit.component';

describe('AddEditComponent', () => {
  let component: AddEditComponent;
  let fixture: ComponentFixture<AddEditComponent>;

  let fakedDesignation = [new Designation()];
  let fakedDepartments = [new Department()];
  let fakedStatus = [new Status()];

  let observableGetDepartment: Observable<Department[]> =   
    new Observable(observer => {
      observer.next(fakedDepartments);
      observer.complete();
  });

  let observableGetDesignation: Observable<Designation[]> =   
  new Observable(observer => {
    observer.next(fakedDesignation);
    observer.complete();
  });

  let observableGetStatus: Observable<Status[]> =   
  new Observable(observer => {
    observer.next(fakedStatus);
    observer.complete();
  });

  let observableGetByCode: Observable<Employee[]> =   
    new Observable(observer => {
      observer.next([]);
      observer.complete();
  });

  let observableAdd: Observable<Employee> =   
  new Observable(observer => {
    observer.next(null);
    observer.complete();
  });

  let observableUpdate: Observable<Employee> =   
    new Observable(observer => {
      observer.next(null);
      observer.complete();
  }); 

  let employeeServiceStub: Partial<EmployeeService> = {
    add: () => observableAdd,
    getByCode: () => observableGetByCode,
    update: () => observableUpdate,
  }
  let departmentServiceStub: Partial<DepartmentService> = {
    getAll: () => observableGetDepartment,
  }
  let designationServiceStub: Partial<DesignationService> = {
    getAll: () => observableGetDesignation,
  }
  let statusServiceStub: Partial<StatusService> = {
    getAll: () => observableGetStatus,
  }
  let navigateStub: Partial<AlertService> = {
    showSuccess: () => new Promise(res => true),
    showWarning: () => new Promise(res => true),
    showError:   () => new Promise(res => true),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        Ng2OrderModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot()
      ],
      declarations: [ AddEditComponent ],
      providers:[
        DepartmentService,
        DesignationService,
        AlertService,
       { 
        provide: EmployeeService,  
        useValue: employeeServiceStub 
      },
      { 
        provide: DepartmentService,  
        useValue: departmentServiceStub 
      },
      { 
        provide: DesignationService,  
        useValue: designationServiceStub 
      },
      { 
        provide: StatusService,  
        useValue: statusServiceStub 
      },
      { 
        provide: AlertService,  
        useValue: navigateStub 
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //get
  it("getall data from designation", () => {
    component.designation = [];
    component.getDesignation();
    expect(component.designation.length).toEqual(1);
  });

  it("getall data from department", () => {
    component.department = [];
    component.getDepartment();
    expect(component.department.length).toEqual(1);
  });

  it("getall data from status", () => {
    component.status = [];
    component.getStatus();
    expect(component.status.length).toEqual(1);
  });
});

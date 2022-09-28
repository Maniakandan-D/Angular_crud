import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/alertService/alert.service';
import { Department } from '../shared/department.model';
import { DepartmentService } from '../shared/department.service';
import { DepartmentAddComponent } from './department-add.component';

describe('DepartmentAddComponent', () => {
  let component: DepartmentAddComponent;
  let fixture: ComponentFixture<DepartmentAddComponent>;

  let observableDepartment: Observable<Department> =   
    new Observable(observer => {
      observer.next(new Department());
      observer.complete();
  });

  let observableGetByName: Observable<Department[]> =   
    new Observable(observer => {
      observer.next([]);
      observer.complete();
  });  

  let observableAdd: Observable<Department> =   
  new Observable(observer => {
    observer.next(null);
    observer.complete();
  }); 
        
  let departmentServiceStub: Partial<DepartmentService> = {
    delete: () => observableDepartment,
    getByName: () => observableGetByName,
    add: () => observableAdd,
  }

  let routerStub: Partial<Router> = {
    navigate: () => new Promise(res => true),
  }

  let navigateStub: Partial<AlertService> = {
    showSuccess: () => new Promise(res => true),
    showWarning: () => new Promise(res => true),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        Ng2OrderModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ DepartmentAddComponent ],
      providers:[{ 
        provide: DepartmentService,  
        useValue: departmentServiceStub 
      },
      { 
        provide: Router,  
        useValue: routerStub 
      },
      { 
        provide: AlertService,  
        useValue: navigateStub 
      }],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add department', () => {
    component.form.setValue({
        name:"dummyname"
    });

    let submitted = component.submitForm();
    expect(submitted).toBe(true);
  });

  it('should not add department', () => {
    component.form.setValue({
        name:""
    });

    let submitted = component.submitForm();
    expect(submitted).toBe(false);
  });
  
});

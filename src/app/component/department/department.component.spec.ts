import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/alertService/alert.service';
import { DepartmentComponent } from './department.component';
import { Department, DepartmentVM } from './shared/department.model';
import { DepartmentService } from './shared/department.service';

describe('DepartmentComponent', () => {
  let component: DepartmentComponent;
  let fixture: ComponentFixture<DepartmentComponent>;

  let fakedDepartments = [new Department()];

  let observableDepartments: Observable<Department[]> =   
    new Observable(observer => {
      observer.next(fakedDepartments);
      observer.complete();
  });

  let observableDelDepartment: Observable<Department> =   
    new Observable(observer => {
      observer.next(new Department());
      observer.complete();
  });

  let observableGetByName: Observable<Department[]> =   
    new Observable(observer => {
      observer.next([]);
      observer.complete();
  });  

  let observableUpdate: Observable<Department> =   
    new Observable(observer => {
      observer.next(null);
      observer.complete();
  });
  
  let navigateStub: Partial<AlertService> = {
    showSuccess: () => new Promise(res => true),
    showWarning: () => new Promise(res => true),
    showError:   () => new Promise(res => true),
  }

  let departmentServiceStub: Partial<DepartmentService> = {
    delete: () => observableDelDepartment,
    getAll: () => observableDepartments,
    getByName: () => observableGetByName,
    update: () => observableUpdate,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        Ng2SearchPipeModule,
        NgxPaginationModule,
        Ng2OrderModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [ DepartmentComponent ],
      providers:[{ 
        provide: DepartmentService,  
        useValue: departmentServiceStub 
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
    fixture = TestBed.createComponent(DepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("department getall should be one", () => {
    component.departmentData = [];
    component.getAll();
    expect(component.departmentData.length).toEqual(1);
  });

  it("single delete department", () => {
      component.departmentData = [];
      for(let i =1; i<= 10; i++)
      {
        var dept = new Department();
        dept.id = i.toString();
        dept.name = "dept"+i;
        component.departmentData.push(dept);
      }
      var seventhDept = component.departmentData[7];
      spyOn(window, 'confirm').and.callFake(function () {
        return true;
    });

    component.deleteDepartment(seventhDept);
  
    expect(component.departmentData.length).toEqual(9);
  });

  it("multi delete department", () => {
    component.departmentData = [];

    for(let i =1; i<= 10; i++)
    {
      var dept = new Department();
      dept.id = i.toString();
      dept.name = "dept"+i;
      component.departmentData.push(dept);
    }
    for(let i =1; i<= 5; i++)
    {
      component.departmentData[i].checked = true;
    }
    spyOn(window, 'confirm').and.callFake(function () {
      return true;
    });
    component.deleteSelectedDepartment();
    expect(component.departmentData.length).toEqual(5);
  });

  it('update department', () => {
    
    var updateDepartment = new DepartmentVM();
    updateDepartment.id = "1";
    updateDepartment.name = "dept1";
    updateDepartment.isEdit = true;

    component.update(updateDepartment);

    expect(updateDepartment.isEdit).toEqual(false);
  });
 
});
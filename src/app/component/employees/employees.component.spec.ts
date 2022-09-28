import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/alertService/alert.service';

import { EmployeesComponent } from './employees.component';
import { Employee } from './shared/employee.model';
import { EmployeeService } from './shared/employee.service';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  let fakedDepartments = [new Employee()];

  let observableDepartments: Observable<Employee[]> =   
    new Observable(observer => {
      observer.next(fakedDepartments);
      observer.complete();
  });

  let observableDelEmployee: Observable<Employee> =   
    new Observable(observer => {
      observer.next(new Employee());
      observer.complete();
  });
  
  let employeeServiceStub: Partial<EmployeeService> = {
    delete: () => observableDelEmployee,
    getAll: () => observableDepartments,
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
        ToastrModule.forRoot(),
        Ng2SearchPipeModule,
        NgxPaginationModule,
        Ng2OrderModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ EmployeesComponent ],
      providers:[{ 
        provide: EmployeeService,  
        useValue: employeeServiceStub 
      },
      { 
        provide: AlertService,  
        useValue: navigateStub 
      }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("employee getall should be one", () => {
    component.employees = [];
    component.getEmployee();
    expect(component.employees.length).toEqual(1);
  });

  it("single delete employee", () => {
    component.employees = [];
    for(let i =1; i<= 10; i++)
    {
      var employee = new Employee();
      employee.id = i.toString();
      employee.name = "employee"+i;
      component.employees.push(employee);
    }

    var sixthEmployee = component.employees[6];

    spyOn(window, 'confirm').and.callFake(function () {
      return true;
  });

  component.deleteEmployee(sixthEmployee);
 
  expect(component.employees.length).toEqual(9);
});

it("multi delete employee", () => {
  component.employees = [];

  for(let i =1; i<= 10; i++)
  {
    var employee = new Employee();
    employee.id = i.toString();
    employee.name = "employee"+i;
    component.employees.push(employee);
  }

  for(let i =1; i<= 5; i++)
  {
    component.employees[i].checked = true;
  }

  spyOn(window, 'confirm').and.callFake(function () {
    return true;
  });
  component.deleteMultiEmployees();
 
  expect(component.employees.length).toEqual(5);
});

it("should test deleteEmployee method on delete button", () => {

  spyOn(component, "deleteEmployee")
  
  component.deleteEmployee; 
  fixture.detectChanges(); 
  let el = fixture.debugElement.query(By.css('.mx-1'))
  el.triggerEventHandler('click', null)

  fixture.detectChanges()

  fixture.whenStable().then(() => {
      expect(component.deleteEmployee).toHaveBeenCalled();
  });
});
});

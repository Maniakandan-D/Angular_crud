import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/shared/alertService/alert.service';
import { DepartmentService } from '../department/shared/department.service';
import { DesignationService } from '../designation/shared/designation.service';

import { EmployeesComponent } from './employees.component';
import { EmployeeService } from './shared/employee.service';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [ EmployeesComponent ],
      providers:[DepartmentService,
       DesignationService,
       EmployeeService,
       AlertService
      ]
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
});

import { AnimationDriver } from '@angular/animations/browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { AlertService } from 'src/app/shared/alertService/alert.service';
import { DepartmentService } from '../shared/department.service';
import { DepartmentAddComponent } from './department-add.component';

describe('DepartmentAddComponent', () => {
  let component: DepartmentAddComponent;
  let fixture: ComponentFixture<DepartmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ DepartmentAddComponent ],
      providers:[
        DepartmentService,
        AlertService
      ]
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
  it('should  all value form submitForm', () =>{
    expect(component.submitForm).toBeTruthy();
  });
});

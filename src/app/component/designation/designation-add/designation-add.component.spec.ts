import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/alertService/alert.service';
import { Designation } from '../shared/designation.model';
import { DesignationService } from '../shared/designation.service';
import { DesignationAddComponent } from './designation-add.component';

describe('DesignationAddComponent', () => {
  let component: DesignationAddComponent;
  let fixture: ComponentFixture<DesignationAddComponent>;

  let observableDesignation: Observable<Designation> =   
  new Observable(observer => {
    observer.next(new Designation());
    observer.complete();
  });

  let observableGetByName: Observable<Designation[]> =   
    new Observable(observer => {
      observer.next([]);
      observer.complete();
  });  

  let observableAdd: Observable<Designation> =   
  new Observable(observer => {
    observer.next(null);
    observer.complete();
  }); 

  let designationServiceStub: Partial<DesignationService> = {
    delete: () => observableDesignation,
    getByName: () => observableGetByName,
    add: () => observableAdd,
  }

  let routerStub: Partial<Router> = {
    navigate: () => new Promise(res => true),
  }

  let navigateStub: Partial<AlertService> = {
    showSuccess: () => new Promise(res => true),
    showWarning: () => new Promise(res => true),
    showError: () => new Promise(res => true),
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
      declarations: [ DesignationAddComponent ],
      providers:[{ 
        provide: DesignationService,  
        useValue: designationServiceStub 
      },
      { 
        provide: Router,  
        useValue: routerStub 
      },
      { 
        provide: AlertService,  
        useValue: navigateStub 
      }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add designation', () => {
    component.form.setValue({
        name:"designationname"
    });

    let submitted = component.submitForm();
    expect(submitted).toBe(true);
  });

  it('should not add designation', () => {
    component.form.setValue({
        name:""
    });

    let submitted = component.submitForm();
    expect(submitted).toBe(false);
  });

});

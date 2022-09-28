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
import { Status} from '../shared/status.model';
import { StatusService } from '../shared/status.service';

import { StatusAddComponent } from './status-add.component';

describe('StatusAddComponent', () => {
  let component: StatusAddComponent;
  let fixture: ComponentFixture<StatusAddComponent>;

  let observableStatus: Observable<Status> =   
  new Observable(observer => {
    observer.next(new Status());
    observer.complete();
  });

  let observableGetByName: Observable<Status[]> =   
    new Observable(observer => {
      observer.next([]);
      observer.complete();
  });  

  let observableAdd: Observable<Status> =   
  new Observable(observer => {
    observer.next(null);
    observer.complete();
  }); 
      
  let statusServiceStub: Partial<StatusService> = {
    delete: () => observableStatus,
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
        ReactiveFormsModule,
        FormsModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        Ng2OrderModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [ StatusAddComponent ],
      providers:[{ 
        provide: StatusService,  
        useValue: statusServiceStub 
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
    fixture = TestBed.createComponent(StatusAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add status', () => {
    component.form.setValue({
        name:"statusname"
    });

    let submitted = component.submitForm();
    expect(submitted).toBe(true);
  });

  it('should not add status', () => {
    component.form.setValue({
        name:""
    });

    let submitted = component.submitForm();
    expect(submitted).toBe(false);
  });
});

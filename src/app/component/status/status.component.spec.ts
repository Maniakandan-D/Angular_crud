import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/alertService/alert.service';
import { Status, StatusVM } from './shared/status.model';
import { StatusService } from './shared/status.service';

import { StatusComponent } from './status.component';

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;
  let fakedStatus = [new Status()];

  let observableStatus: Observable<Status[]> =   
    new Observable(observer => {
      observer.next(fakedStatus);
      observer.complete();
  });

  let observableDelStatus: Observable<Status> =   
    new Observable(observer => {
      observer.next(new Status());
      observer.complete();
  });

  let observableGetByName: Observable<Status[]> =   
    new Observable(observer => {
      observer.next([]);
      observer.complete();
  });  

  let observableUpdate: Observable<Status> =   
    new Observable(observer => {
      observer.next(null);
      observer.complete();
  }); 
  let statusServiceStub: Partial<StatusService> = {
    delete: () => observableDelStatus,
    getAll: () => observableStatus,
    getByName: () => observableGetByName,
    update: () => observableUpdate,
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
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
      ],
      declarations: [ StatusComponent ],
      providers:[{ 
        provide: StatusService,  
        useValue: statusServiceStub 
      },
      { 
        provide: AlertService,  
        useValue: navigateStub 
      }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("status getall should be one", () => {
    component.statusData = [];
    component.getStatus();
    expect(component.statusData.length).toEqual(1);
  });

  it("single delete status", () => {
    component.statusData = [];

    for(let i =1; i<= 9; i++)
    {
      var status = new Status();
      status.id = i.toString();
      status.name = "status"+i;
      component.statusData.push(status);
    }
    var fourthStatus = component.statusData[4];
    spyOn(window, 'confirm').and.callFake(function () {
        return true;
    });
    component.deleteStatus(fourthStatus);
  
    expect(component.statusData.length).toEqual(8);
  });

  it("multi delete status", () => {
    component.statusData = [];
  
    for(let i =1; i<= 10; i++)
    {
      var status= new Status();
      status.id = i.toString();
      status.name = "status"+i;
      component.statusData.push(status);
    }
  
    for(let i =1; i<= 5; i++)
    {
      component.statusData[i].checked = true;
    }
    spyOn(window, 'confirm').and.callFake(function () {
      return true;
    });

    component.deleteMultiStatus();
    expect(component.statusData.length).toEqual(5);
  });
  
  it('update status', () => {
    var statusUpdate = new StatusVM();
    statusUpdate.id = "1";
    statusUpdate.name = "status1";
    statusUpdate.isEdit = true;

    component.update(statusUpdate);
    expect(statusUpdate.isEdit).toEqual(false);
  }); 
});

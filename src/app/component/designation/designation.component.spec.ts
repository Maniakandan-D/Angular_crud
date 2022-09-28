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

import { DesignationComponent } from './designation.component';
import { Designation, DesignationVM } from './shared/designation.model';
import { DesignationService } from './shared/designation.service';

describe('DesignationComponent', () => {
  let component: DesignationComponent;
  let fixture: ComponentFixture<DesignationComponent>;

  let fakedDesignation = [new Designation()];

  let observableGetDesign: Observable<Designation[]> =   
    new Observable(observer => {
      observer.next(fakedDesignation);
      observer.complete();
  });

  let observableDeleteDesign: Observable<Designation> =   
    new Observable(observer => {
      observer.next(new Designation());
      observer.complete();
  });

  let observableGetByName: Observable<Designation[]> =   
    new Observable(observer => {
      observer.next([]);
      observer.complete();
  });  

  let observableUpdate: Observable<Designation> =   
    new Observable(observer => {
      observer.next(null);
      observer.complete();
  }); 

  let designationServiceStub: Partial<DesignationService> = {
    delete: () => observableDeleteDesign,
    getAll: () => observableGetDesign,
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
        ToastrModule.forRoot(),
        Ng2SearchPipeModule,
        NgxPaginationModule,
        Ng2OrderModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ DesignationComponent ],
      providers:[{ 
        provide: DesignationService,  
        useValue: designationServiceStub 
      },
      { 
        provide: AlertService,  
        useValue: navigateStub 
      }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("designation getall should be one", () => {
    component.designationData = [];
    component.getDesignation();
    expect(component.designationData.length).toEqual(1);
  });

 it("single delete designation", () => {
    component.designationData = [];

    for(let i =1; i<= 5; i++)
    {
      var design = new Designation();
      design.id = i.toString();
      design.name = "design"+i;
      component.designationData.push(design);
    }

    var thirdDesign = component.designationData[3];

    spyOn(window, 'confirm').and.callFake(function () {
      return true;
    });

    component.deleteDesignation(thirdDesign);
  
    expect(component.designationData.length).toEqual(4);
  });

  it("should create multi delete designation", () => {
    component.designationData = [];

    for(let i =1; i<= 10; i++)
    {
      var design = new Designation();
      design.id = i.toString();
      design.name = "designation"+i;
      component.designationData.push(design);
    }
  
    for(let i =1; i<= 5; i++)
    {
      component.designationData[i].checked = true;
    }
    spyOn(window, 'confirm').and.callFake(function () {
      return true;
    });
    component.deleteMultiDesignation();
    expect(component.designationData.length).toEqual(5);
  });

  it('update designation', () => {
    var designationUpdate = new DesignationVM();
    designationUpdate.id = "1";
    designationUpdate.name = "design1";
    designationUpdate.isEdit = true;

    component.update(designationUpdate);
    expect(designationUpdate.isEdit).toEqual(false);
  });

});

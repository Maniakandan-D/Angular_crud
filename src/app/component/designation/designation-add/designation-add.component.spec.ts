import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { AlertService } from 'src/app/shared/alertService/alert.service';
import { DesignationService } from '../shared/designation.service';
import { DesignationAddComponent } from './designation-add.component';

fdescribe('DesignationAddComponent', () => {
  let component: DesignationAddComponent;
  let fixture: ComponentFixture<DesignationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        ReactiveFormsModule, 
        FormsModule
      ],
      declarations: [ DesignationAddComponent ],
      providers:[
        AlertService,
        DesignationService
      ]
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
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
=======

>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
import { DepartmentAddComponent } from './department-add.component';

describe('DepartmentAddComponent', () => {
  let component: DepartmentAddComponent;
  let fixture: ComponentFixture<DepartmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentAddComponent ]
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
});

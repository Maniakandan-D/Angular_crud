import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { DepartmentService } from './department.service';
import { Department } from './department.model';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let httpSpy: Spy<HttpClient>;
  let fakeDepartment: Department[] = [
    {
      id: "1",
      name: "david",
    }]

  let getByName: Department[] = [
    {
      id: "1",
      name: "dept",
    },
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        DepartmentService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
      ]
    });
    service = TestBed.inject(DepartmentService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
// post
  it('should create a new department', (done: DoneFn) => {

    var newDepartment = {
      name: "dept",
    } as Department;

    httpSpy.post.and.nextWith(newDepartment);
    service.add(newDepartment).subscribe({
      next: department => {
        expect(department).toEqual(newDepartment);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  //get
  it('should return an expected list of department', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeDepartment);

    service.getAll().subscribe({
      next: (department: any) => {
        expect(department).toHaveSize(fakeDepartment.length);
        done();
      },
      error: done.fail
  });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should getByName of department', (done: DoneFn) => {
    httpSpy.get.and.nextWith(getByName);

    service.getByName('dept').subscribe({
      next: (name: Department[]) => {
        expect(name).toHaveSize(getByName.length);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should getById of department', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeDepartment);

    service.getById('2').subscribe({
      next: (id: Department) => {
        expect(id).toHaveSize(fakeDepartment.length);
        done();
      },
      error: done.fail
  });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  //put
  it('should update a department with given department id', (done: DoneFn) => {

    var department = fakeDepartment[0];
    department.name = "Updated department";

    httpSpy.put.and.nextWith(department);

    service.update(department).subscribe({
      next: (department: { name: any; }) => {
        expect(department.name).toEqual("Updated department");
        done();
      },
      error: done.fail
  });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  //delete
//   it('should delete an existing department', (done: DoneFn) => {
//     httpSpy.delete.and.nextWith(new HttpResponse ({
//        status: 200
//     }));

//     service.delete("1").subscribe({
//       next: response => {
//         expect(response.id).toEqual(200);
//         done();
//       },
//      error: done.fail
//   });
//     expect(httpSpy.delete.calls.count()).toBe(1);  
// });

it('should return a 404', (done: DoneFn) => {
  var departmentId = "89776683";

  httpSpy.get.and.throwWith(new HttpErrorResponse({
        error: "404 - Not Found",
        status: 404
  }));

  service.getById(departmentId).subscribe({
    next: department => {
      done.fail("Expected a 404");
    },
    error: error => {
      expect(error.status).toEqual(404);
      done();
    }
  });
  expect(httpSpy.get.calls.count()).toBe(1);
});
});
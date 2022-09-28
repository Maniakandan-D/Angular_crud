import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { TestBed } from '@angular/core/testing';
import { Employee } from './employee.model';

import { EmployeeService } from './employee.service';

describe('EmployeeService', (): void => {
  let service: EmployeeService;
  let httpSpy: Spy<HttpClient>;
  let fakeEmployee: Employee[] = [
    {
      id: "1",
      empCode: "1205",
      name: "david",
      email: "david@gmail.com",
      designation:"Network Engineer",
      department: "Network",
      date:"2019-06-13",
      status:"Probation",
      salary:"$78687",
    },
    {
      id: "2",
      empCode: "1205",
      name: "Albie",
      email: "albie@gmail.com",
      designation:"Software Engineer",
      department: "Software",
      date:"2009-09-23",
      status:"Confirmed",
      salary:"$67678",
    },
  ]

  let getByCode: Employee[] = [
    {
      id: "1",
      empCode: "1205",
      name: "Albie",
      email: "albie@gmail.com",
      designation:"Software Engineer",
      department: "Software",
      date:"2009-09-23",
      status:"Confirmed",
      salary:"$67678",
    },
    {
      id: "2",
      empCode: "1205",
      name: "david",
      email: "david@gmail.com",
      designation:"Network Engineer",
      department: "Network",
      date:"2019-06-13",
      status:"Probation",
      salary:"$78687",
    },
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        EmployeeService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
      ]
    });
    service = TestBed.inject(EmployeeService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // post
  it('should create a new department', (done: DoneFn) => {

    var newEmployee = {
      empCode: "1207",
      name: "morgan",
      email: "morgan@gmail.com",
      designation:"Software Engineer",
      department: "Software",
      date:"2012-05-12",
      status:"Confirmed",
      salary:"$36787",
    } as Employee;

    httpSpy.post.and.nextWith(newEmployee);
    service.add(newEmployee).subscribe({
      next: employees => {
        expect(employees).toEqual(newEmployee);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  //get
  it('should return an expected list of employee', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeEmployee);

    service.getAll().subscribe({
      next: (employee: any) => {
        expect(employee).toHaveSize(fakeEmployee.length);
        done();
      },
      error: done.fail
  });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('To test getByCode of employee', (done: DoneFn) => {
    httpSpy.get.and.nextWith(getByCode);

    service.getByCode(1207).subscribe({
      next: (empCode: Employee[]) => {
        expect(empCode).toHaveSize(getByCode.length);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('To test  getById of employee', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeEmployee);

    service.getById('1').subscribe({
      next: (id: Employee) => {
        expect(id).toHaveSize(fakeEmployee.length);
        done();
      },
      error: done.fail
  });
    expect(httpSpy.get.calls.count()).toBe(1);
  });
   //put
   it('To test update a designation with given designation id', (done: DoneFn) => {
    var employee = fakeEmployee[0];
    var id = '1'
    employee.name = "Updated employee";

    httpSpy.put.and.nextWith(employee);

    service.update(id, employee).subscribe({
      next: (employee: { name: any; }) => {
        expect(employee.name).toEqual("Updated employee");
        done();
      },
      error: done.fail
  });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should return a 404', (done: DoneFn) => {
    var employeeId = "986723283";
  
    httpSpy.get.and.throwWith(new HttpErrorResponse({
          error: "404 - Not Found",
          status: 404
    }));
  
    service.getById(employeeId).subscribe({
      next: employee => {
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

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { TestBed } from '@angular/core/testing';
import { Designation } from './designation.model';

import { DesignationService } from './designation.service';

describe('DesignationService', () => {
  let service: DesignationService;
  let httpSpy: Spy<HttpClient>;
  let fakeDesignation: Designation[] = [
    {
      id: "1",
      name: "mark",
    }]

  let getByName: Designation[] = [
    {
      id: "1",
      name: "design",
    },
  ]


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        DesignationService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },]
    });
    service = TestBed.inject(DesignationService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // post
  it('To test post service', (done: DoneFn) => {

    var newDesignation = {
      name: "dept",
    } as Designation;

    httpSpy.post.and.nextWith(newDesignation);
    service.add(newDesignation).subscribe({
      next: department => {
        expect(department).toEqual(newDesignation);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('To test get service', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeDesignation);

    service.getAll().subscribe({
      next: (designation: any) => {
        expect(designation).toHaveSize(fakeDesignation.length);
        done();
      },
      error: done.fail
  });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('To test getByName of designation', (done: DoneFn) => {
    httpSpy.get.and.nextWith(getByName);

    service.getByName('dept').subscribe({
      next: (name: Designation[]) => {
        expect(name).toHaveSize(getByName.length);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('To test getById of designation', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeDesignation);

    service.getById('2').subscribe({
      next: (id: Designation) => {
        expect(id).toHaveSize(fakeDesignation.length);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });
  //put
  it('To test update a designation with given designation id', (done: DoneFn) => {
    var designation = fakeDesignation[0];
    designation.name = "Updated designation";

    httpSpy.put.and.nextWith(designation);

    service.update(designation).subscribe({
      next: (designation: { name: any; }) => {
        expect(designation.name).toEqual("Updated designation");
        done();
      },
      error: done.fail
  });
    expect(httpSpy.put.calls.count()).toBe(1);
  });
  
  // delete service to add once ready 

  it('should return a 404', (done: DoneFn) => {
    var designationId = "26787983";
  
    httpSpy.get.and.throwWith(new HttpErrorResponse({
          error: "404 - Not Found",
          status: 404
    }));
  
    service.getById(designationId).subscribe({
      next: designation => {
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

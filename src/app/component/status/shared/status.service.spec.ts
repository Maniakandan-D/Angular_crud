import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Status } from './status.model';

import { StatusService } from './status.service';

describe('StatusService', () => {
  let service: StatusService;
  let httpSpy: Spy<HttpClient>;
  let fakeStatus: Status[] = [
    {
      id: "1",
      name: "david",
      createdOn:new Date,
      modifiedOn:new Date,
    }]

  let getByName: Status[] = [
    {
      id: "1",
      name: "status",
      createdOn: new Date,
      modifiedOn: new Date,
    },
  ]
    

  beforeEach(() => {
    TestBed.configureTestingModule({
     providers:[
      StatusService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
     ]
    });
    service = TestBed.inject(StatusService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // post
  it('To test post service for status', (done: DoneFn) => {

    var newStatus = {
      name: "status",
    } as Status;

    httpSpy.post.and.nextWith(newStatus);
    service.add(newStatus).subscribe({
      next: status => {
        expect(status).toEqual(newStatus);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  //get
  it('To test get service of status', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeStatus);

    service.getAll().subscribe({
      next: (status: any) => {
        expect(status).toHaveSize(fakeStatus.length);
        done();
      },
      error: done.fail
  });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('To test getByName of department', (done: DoneFn) => {
    httpSpy.get.and.nextWith(getByName);

    service.getByName('status').subscribe({
      next: (name: Status[]) => {
        expect(name).toHaveSize(getByName.length);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('To test getById of department', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeStatus);

    service.getById('2').subscribe({
      next: (id: Status) => {
        expect(id).toHaveSize(fakeStatus.length);
        done();
      },
      error: done.fail
  });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  //put
  it('To update a status with given status id', (done: DoneFn) => {

    var status = fakeStatus[0];
    status.name = "Updated status";

    httpSpy.put.and.nextWith(status);

    service.update(status).subscribe({
      next: (status: { name: any; }) => {
        expect(status.name).toEqual("Updated status");
        done();
      },
      error: done.fail
  });
    expect(httpSpy.put.calls.count()).toBe(1);
  });
  
  it('should return a 404', (done: DoneFn) => {
    var statusId = "97768387";
  
    httpSpy.get.and.throwWith(new HttpErrorResponse({
          error: "404 - Not Found",
          status: 404
    }));
  
    service.getById(statusId).subscribe({
      next: status => {
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

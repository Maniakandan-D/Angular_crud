import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from '../shared/status.model';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-status-add',
  templateUrl: './status-add.component.html',
  styleUrls: ['./status-add.component.css']
})
export class StatusAddComponent implements OnInit {
  myForm: Status = new Status();
  constructor(private statusService: StatusService,
    private router:Router) { }

  ngOnInit(): void {
  }
  addStatus(){
    this.statusService.addStatus(this.myForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/status"])
      },
      error:(err) => {
        console.log(err);
      }
    });
  }
  back(){
    this.router.navigate(['/status']);
   }
}


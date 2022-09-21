import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../shared/status.model';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styleUrls: ['./status-view.component.css']
})
export class StatusViewComponent implements OnInit {
  id: string;
  Status: Status;
  constructor(private route: ActivatedRoute, private statusService: StatusService, private router: Router) { }

  ngOnInit(): void {

    this.Status = new Status();
    this.id = this.route.snapshot.params['id'];

    this.statusService.getStatusDetails(this.id)
    .subscribe(data => {
      this.Status= data;
    }, error => console.log(error));
  }
  statusDetails(id: string){
    this.router.navigate(['status/status-view', id])
   }
   list(){
    this.router.navigate(['/status']);
   }
  }
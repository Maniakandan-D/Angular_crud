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
    this.statusService.getById(this.id)
    .subscribe({
      next:data => {
        this.Status= data;
      }
    });
  }

  statusDetails(id: string): void{
    this.router.navigate(['status/status-view', id])
   }

   back(): void{
      this.router.navigate(['/status']);
   }
}
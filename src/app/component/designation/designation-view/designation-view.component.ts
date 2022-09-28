import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Designation } from '../shared/designation.model';
import { DesignationService } from '../shared/designation.service';

@Component({
  selector: 'app-designation-view',
  templateUrl: './designation-view.component.html',
  styleUrls: ['./designation-view.component.css']
})
export class DesignationViewComponent implements OnInit {
  id: string;
  designationData: Designation;

  constructor(private route: ActivatedRoute, private designationService: DesignationService, 
    private router: Router) { }

  ngOnInit(): void {
    this.designationData = new Designation();
    this.id = this.route.snapshot.params['id'];
    this.designationService.getById(this.id)
    .subscribe({
      next: data => {
      this.designationData = data;
      }
    });
  }

  designationDetails(id: string): void{
      this.router.navigate(['designation/designation-view', id])
  }

  back(): void{
    this.router.navigate(['/designation']);
  }
}
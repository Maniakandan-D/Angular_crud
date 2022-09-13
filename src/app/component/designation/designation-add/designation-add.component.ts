import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DesignationService } from '../shared/designation.service';
import { Designation } from '../shared/designation.model';

@Component({
  selector: 'app-designation-add',
  templateUrl: './designation-add.component.html',
  styleUrls: ['./designation-add.component.css']
})
export class DesignationAddComponent implements OnInit {
  designForm: Designation =new Designation();

  constructor(private designationService: DesignationService,
    private router:Router) { }

  ngOnInit(): void {
  }
  addDesignation(){
    this.designationService.addDesignation(this.designForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/designation"])
      },
      error:(err) => {
        console.log(err);
      }
    });
  }
  back(){
    this.router.navigate(['/designation']);
   }
}

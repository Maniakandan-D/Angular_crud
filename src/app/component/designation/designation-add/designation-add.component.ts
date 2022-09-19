import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Designation } from '../shared/designation.model';
import { DesignationService } from '../shared/designation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-designation-add',
  templateUrl: './designation-add.component.html',
  styleUrls: ['./designation-add.component.css']
})
export class DesignationAddComponent implements OnInit {
  form!: FormGroup;
  
  myForm: Designation = new Designation();

  constructor(private designationService: DesignationService,
    private router:Router, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      designationCode:  [ '',
        [Validators.required]
      ],
      designation:  [ '',
        [Validators.required]
      ],
    }, {updateOn: 'change' });
  }
  submitForm(){
   this.designationService.addDesignation(this.myForm)
      .subscribe({
        next:(data) => {
          this.router.navigate(["/designation"])
        },
      });
      return true;
    }
  back(){
    this.router.navigate(['/designation']);
   }
}

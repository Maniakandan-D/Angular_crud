import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { Designation } from '../shared/designation.model';
import { DesignationService } from '../shared/designation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


=======
import { DesignationService } from '../shared/designation.service';
import { Designation } from '../shared/designation.model';
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d

@Component({
  selector: 'app-designation-add',
  templateUrl: './designation-add.component.html',
  styleUrls: ['./designation-add.component.css']
})
export class DesignationAddComponent implements OnInit {
<<<<<<< HEAD
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
=======
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
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
  back(){
    this.router.navigate(['/designation']);
   }
}

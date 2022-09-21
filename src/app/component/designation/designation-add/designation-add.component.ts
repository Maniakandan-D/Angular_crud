import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Designation } from '../shared/designation.model';
import { DesignationService } from '../shared/designation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/alertService/alert.service';



@Component({
  selector: 'app-designation-add',
  templateUrl: './designation-add.component.html',
  styleUrls: ['./designation-add.component.css']
})
export class DesignationAddComponent implements OnInit {
  form!: FormGroup;
  
  myForm: Designation = new Designation();

  constructor(private designationService: DesignationService,
    private router:Router, private formBuilder: FormBuilder,
    private notifyService : AlertService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      designation:  [ '',
        [Validators.required]
      ],
    }, {updateOn: 'change' });
  }
  submitForm(){
    var designation = this.form.get('designation').value;
    this.designationService.getDesignationByName(designation).subscribe((data: any)=>{
      if(data.length > 0){
        this.notifyService.showWarning("Designation name already exists..!");
      }else{
        this.designationService.addDesignation(this.myForm)
        .subscribe({
          next:(data) => {
            this.notifyService.showSuccess("Designation added successfully !!")
            this.router.navigate(["/designation"])
          },
          error: (err) =>{
            console.log(err)
            this.notifyService.showError("Something went wrong");
          }
        });
      }
    });
      return true;
    }
  back(){
    this.router.navigate(['/designation']);
   }
}

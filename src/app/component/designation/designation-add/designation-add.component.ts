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
    name:  [ '', [Validators.required]
      ],
    }, {updateOn: 'change' });
  }

  submitForm(): boolean{
    var name = this.form.get('name').value;
    if(!name.trim()){
      return false;
    }
    this.designationService.getByName(name).subscribe((data: any)=>{
      if(data.length > 0)
      {
        this.notifyService.showWarning(`Designation ${name} already exists..!`);
      }
      else {
        this.designationService.add(this.myForm)
        .subscribe({
          next:(data: any) => {
            this.notifyService.showSuccess(`Designation ${name} added successfully !!`)
            this.router.navigate(["/designation"])
          },
          error: (err: any) =>{
            this.notifyService.showError("Something went wrong during designation addded");
          }
        });
      }
    });
      return true;
  }
  
  back(): void{
    this.router.navigate(['/designation']);
   }
}

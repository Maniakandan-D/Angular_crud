import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from '../shared/status.model';
import { StatusService } from '../shared/status.service';
<<<<<<< HEAD
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

=======
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d

@Component({
  selector: 'app-status-add',
  templateUrl: './status-add.component.html',
  styleUrls: ['./status-add.component.css']
})
export class StatusAddComponent implements OnInit {
<<<<<<< HEAD
  form!: FormGroup;
  myForm: Status = new Status();

  constructor(private statusService: StatusService,
    private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      statusCode: this.formBuilder.control ('', Validators.required),
      status: this.formBuilder.control ('', Validators.required),
    }, {updateOn: 'change' });
  }
  submitForm(){
    if(this.form.get('statusCode').value ==''){
  
      return true;   
    }
    else
    {
      this.myForm.createdOn = this.myForm.modifiedOn = new Date();
      this.statusService.addStatus(this.myForm)
      .subscribe({
        next: (data) =>{
          this.router.navigate(['/status']);
        },
      });
      console.log(this.form.value)
      return true;
    }
    }
=======
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
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
  back(){
    this.router.navigate(['/status']);
   }
}


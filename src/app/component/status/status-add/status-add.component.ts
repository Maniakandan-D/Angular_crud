import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from '../shared/status.model';
import { StatusService } from '../shared/status.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/alertService/alert.service';


@Component({
  selector: 'app-status-add',
  templateUrl: './status-add.component.html',
  styleUrls: ['./status-add.component.css']
})
export class StatusAddComponent implements OnInit {
  
  form!: FormGroup;
  myForm: Status = new Status();

  constructor(private statusService: StatusService,
    private router:Router,private formBuilder: FormBuilder, private notifyService : AlertService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control ('', Validators.required),
    }, {updateOn: 'change' });
  }

  submitForm(): boolean{
    var name = this.form.get('name').value;
    if(!name.trim()){
      return false;
    }
    this.statusService.getByName(name).subscribe((data: any) => {
      if (data.length > 0) {
        this.notifyService.showWarning(`Status ${name} already exists`)
      }
    else
    {
      this.myForm.createdOn = this.myForm.modifiedOn = new Date();
      this.statusService.add(this.myForm)
      .subscribe({
        next: (data: any) =>{
          this.notifyService.showSuccess(`Status ${name} added successfully`);
          this.router.navigate(['/status']);
        },
      })
    }
    });
      return true;
    }
  
  back(): void{
    this.router.navigate(['/status']);
   }
}


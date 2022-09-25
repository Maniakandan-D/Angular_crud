import { Component, OnInit } from '@angular/core';
import { Status } from './shared/status.model';
import { StatusService } from './shared/status.service';
import { AlertService } from 'src/app/shared/alertService/alert.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  statusData: Status[] = [];
  //filter
  searchText:any;
  //pagination
  totalLength:any;
  page:number = 1;
  pageSize:number = 5;
  //edit
 isLoader: boolean;
  // sorting
  key: string = 'id';
  reverse: boolean = false;

  constructor(private statusService: StatusService,  private notifyService : AlertService) { this.isLoader = true; }

  ngOnInit(): void {
    this.getStatus();
  }

  getStatus(): void {
    this.statusService.getAll().subscribe((data) => {
      this.statusData = data;
    });
  }

  deleteStatus(row : any): void{
    if (confirm("Are you sure to delete ?")){
      this.statusService.delete(row.id)
      .subscribe(res => { 
        const index: number = this.statusData.indexOf(row);
        if (index !== -1) {
          this.statusData.splice(index, 1)
          this.notifyService.showSuccess("Status deleted successfully");
        }    
      });
    }
  }

   sort(key: string): void{
    this.key = key;
    this.reverse = !this.reverse;
  }

  checkAllCheckBox(ev: any): void {
		this.statusData.forEach(x => x.checked = ev.target.checked)
	}

  isAllCheckBoxChecked(): boolean{
		return this.statusData.every(row => row.checked);
	}

  deleteMultiStatus(): void {
		const selectedStatus= this.statusData.
    filter(employee => employee.checked).map(row => row.id);
		if(selectedStatus && selectedStatus.length > 0) {
			selectedStatus.forEach(id => {
				this.statusService.delete(id)
				.subscribe({
          next:res => {
					  this.notifyService.showSuccess("Status successfully deleted");
					}, 
          error: err => {
            this.notifyService.showError("Something went wrong during deleting status");
          }
        });
		  });		
		} else {
			  this.notifyService.showWarning("You must select at least one status");
		  }
		  this.getStatus();
	}

   // inlineEdit
   addStatus(): void{
    this.statusData['isEdit'] = true;
  }

  getstatus(): void{
    this.isLoader = false;
    this.statusService.getAll().subscribe({
      next:(res: any) => {
      debugger;
        this.statusData = res;
        this.statusData.forEach(element => {
        element['isEdit'] = false;
        });
        this.isLoader = false;
      },error:error => {
        this.isLoader = false;
      }
    });
  }

  cancel(data: { isEdit: boolean; }): void{
    data.isEdit = false;
  }

  getStatusId(data: { isEdit: boolean; }): void{
   data.isEdit = true;
   this.statusData;
  }

  update(rowData: any): void{
    this.statusService.getByName(rowData.status)
    .subscribe((data: any)=>{
        if(data.length ==0)
          {
            rowData.isEdit = false;
            this.statusService.update(rowData).subscribe((updatedData: any)=>{});
            this.notifyService.showSuccess("status updated successfully")      
        }
          else
          {
            this.notifyService.showError(`status name  already exists..!`)
          }
      });
  }
}

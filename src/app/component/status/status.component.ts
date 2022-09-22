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

  msg: string = '';
  clss: string = '';

  constructor(private statusService: StatusService,  private notifyService : AlertService) { this.isLoader = true; }

  ngOnInit(): void {
    this.getStatus();
  }

  getStatus() {
    this.statusService.getStatus().subscribe((data) => {
      this.statusData = data;
    });
  }

  deleteStatus(row : any){
    // add confirmation before deleting 
    if (confirm("Are you sure to delete ?")){
      this.statusService.deleteStatus(row.id)
      .subscribe(res => { 
        const index: number = this.statusData.indexOf(row);
        if (index !== -1) {
          this.statusData.splice(index, 1)
          this.notifyService.showSuccess("Status deleted successfully");
        }    
      });
    }
  }

   //sorting
   sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  // Multiple delete
  checkAllCheckBox(ev: any) {
		this.statusData.forEach(x => x.checked = ev.target.checked)
	}

  isAllCheckBoxChecked() {
		return this.statusData.every(row => row.checked);
	}

  deleteMultiStatus(): void {
		const selectedStatus= this.statusData.
    filter(employee => employee.checked).map(row => row.id);
	
		if(selectedStatus && selectedStatus.length > 0) {
		
			selectedStatus.forEach(id => {
				this.statusService.deleteMultiStatus(id)
				.subscribe({
          next:res => {
					  this.clss = 'grn';
					  this.msg = 'Status successfully deleted';
					}, 
          error: err => {
            this.clss = 'rd';
						this.msg = 'Something went wrong during deleting status';
          }
        });
		  });		
		} else {
			  this.clss = 'rd';
			  this.msg = 'You must select at least one status';
		  }
		  this.getStatus();
	}
   // inlineEdit
   addStatus(){
    this.statusData['isEdit'] = true;
  }

  getstatus(){
    this.isLoader = false;
    this.statusService.getStatus().subscribe({
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

  cancel(data){
    data.isEdit = false;
  }

  getStatusId(data){
   data.isEdit = true;
   this.statusData;
  }

  update(rowData){
    //check row data has changed
   //validate
    this.statusService.getStatusByName(rowData.status)
    .subscribe((data: any)=>{
        if(data.length ==0)
          {
            rowData.isEdit = false;
              this.statusService.updateStatus(rowData).subscribe((updatedData)=>{});
              this.notifyService.showSuccess("status updated successfully")      
          }
          else
          {
              this.notifyService.showError(`status name  already exists..!`)
          }
      });
   //call update service
  }
}

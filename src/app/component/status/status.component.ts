import { Component, OnInit } from '@angular/core';
import { Status, StatusVM } from './shared/status.model';
import { StatusService } from './shared/status.service';
import { AlertService } from 'src/app/shared/alertService/alert.service';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})

export class StatusComponent implements OnInit {

  statusData: StatusVM[] = [];
  searchText:any;
  totalLength:any;
  page:number = 1;
  pageSize:number = 5;
  isLoader: boolean;
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

  deleteStatus(row : Status): void{
    if (confirm("Are you sure to delete ?")){
      this.statusService.delete(row.id)
      .subscribe(res => { 
        const index: number = this.statusData.indexOf(row);
        if (index !== -1) {
          this.statusData.splice(index, 1)
          this.notifyService.showSuccess(`Status ${row.name} deleted successfully`);
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
    if (confirm("Are you sure to delete ?")){
		const selectedStatus= this.statusData.
    filter(employee => employee.checked);
		if(selectedStatus && selectedStatus.length > 0) {
			selectedStatus.forEach(statusData => {
				this.statusService.delete(statusData.id)
				.subscribe({
          next:res => {
            const index: number = this.statusData.indexOf(statusData);
            if (index !== -1) {
              this.statusData.splice(index, 1);
              this.notifyService.showSuccess(`Employees ${statusData.name} deleted successfully`);
            }
					}, 
          error: err => {
            this.notifyService.showError(`Something went wrong during deleting ${statusData.name}`);
          }
        });
		  });		
		} else {
			  this.notifyService.showWarning("You must select at least one status");
		  }
    }
	}

   addStatus(): void{
    this.statusData['isEdit'] = true;
  }

  cancel(data: { isEdit: boolean; }): void{
    data.isEdit = false;
  }

  getStatusId(data: { isEdit: boolean; }): void{
   data.isEdit = true;
   this.statusData;
  }

  update(rowData: StatusVM): void{
    //if rowData.name == check empty space and trim
    
    // var trimedName = rowData.name.replace(/^\s+|\s+$/gm,'');
    // if(trimedName != ''){
    //   return;
    //   }
    
      this.statusService.getByName(rowData.name.replace(/^\s+|\s+$/gm,''))
      .subscribe((data: Status[])=>{
          if(data.length ==0)
            {
              rowData.isEdit = false;
              this.statusService.update(rowData).subscribe((updatedData: Status)=>{});
              this.notifyService.showSuccess(`status ${rowData.name} updated successfully`)      
          }
            else
            {
              this.notifyService.showError(`status ${rowData.name} already exists..!`)
            }
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { Status } from './shared/status.model';
import { StatusService } from './shared/status.service';

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
  isEdit: boolean = false;
  // sorting
  key: string = 'id';
  reverse: boolean = false;

  msg: string = '';
  clss: string = '';

  constructor(private statusService: StatusService) { }

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
<<<<<<< HEAD
    this.statusService.deleteStatus(row.id)
    .subscribe(res => { 
      const index: number = this.statusData.indexOf(row);
      if (index !== -1) {
          this.statusData.splice(index, 1)
          alert("Status delete successfully");
=======
    this.statusService.delete(row.id)
    .subscribe(res => { 
      const index: number = this.statusData.indexOf(row);
      if (index !== -1) {
          this.statusData.splice(index, 1);
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
      }    
    });
   }
  }
  onEdit(item: any) {
    debugger;
    this.statusData.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
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
<<<<<<< HEAD
  deleteMultiStatus(): void {
		const selectedStatus= this.statusData.
    filter(employee => employee.checked).map(row => row.id);
	
		if(selectedStatus && selectedStatus.length > 0) {
		
			selectedStatus.forEach(id => {
				this.statusService.deleteMultiStatus(id)
				.subscribe(res => {
					this.clss = 'grn';
					this.msg = 'Status successfully deleted';
					}, err => {
                        this.clss = 'rd';
						this.msg = 'Something went wrong during deleting status';
=======
  deleteEmployees(): void {
		const selectedEmployees= this.statusData.
    filter(employee => employee.checked).map(row => row.id);
	
		if(selectedEmployees && selectedEmployees.length > 0) {
		
			selectedEmployees.forEach(id => {
				this.statusService.deleteEmployees(id)
				.subscribe(res => {
					this.clss = 'grn';
					this.msg = 'employees successfully deleted';
					}, err => {
                        this.clss = 'rd';
						this.msg = 'Something went wrong during deleting employee';
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
                    }
                );
		});		
		} else {
			this.clss = 'rd';
<<<<<<< HEAD
			this.msg = 'You must select at least one status';
		}
		this.getStatus();
	}
=======
			this.msg = 'You must select at least one employee';
		}
		this.getStatus();
	}

>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
}

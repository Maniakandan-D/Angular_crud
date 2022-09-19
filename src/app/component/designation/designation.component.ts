import { Component, OnInit } from '@angular/core';
import { Designation } from './shared/designation.model';
import { DesignationService } from './shared/designation.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {
  designationData: Designation[] = [];
  //filter
  searchText:any;
  //pagination
  totalLength:any;
  page:number = 1;
  pageSize:number =5;
  isEdit: boolean = false;
   // sorting
  key: string = 'id';
  reverse: boolean = false;
// MultiDelete
  msg: string = '';
  clss: string = '';

  constructor(private designationService: DesignationService) { }

  ngOnInit(): void {
    this.getDesignation();
  }
  getDesignation() {
    this.designationService.getDesignation().subscribe((data) => {
      this.designationData = data;
    });
  }
  deleteDesignation(row : any){
    // add confirmation before deleting 
    if (confirm("Are you sure to delete ?")){
    this.designationService.deleteDesignation(row.id)
    .subscribe(res => { 
      const index: number = this.designationData.indexOf(row);
      if (index !== -1) {
          this.designationData.splice(index, 1)
          alert("Designation delete successfully");
      }    
    });
   }
  }
  onEdit(item: any) {
    debugger;
    this.designationData.forEach(element => {
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
  this.designationData.forEach(x => x.checked = ev.target.checked)
}
isAllCheckBoxChecked() {
  return this.designationData.every(row => row.checked);
}
deleteMultiDesignation(): void {
  const selectedDesignation= this.designationData.
  filter(employee => employee.checked).map(row => row.id);

  if(selectedDesignation && selectedDesignation.length > 0) {
  
    selectedDesignation.forEach(id => {
      this.designationService.deleteMultiDesignation(id)
      .subscribe(res => {
        this.clss = 'grn';
        this.msg = 'designations successfully deleted';
        }, err => {
            this.clss = 'rd';
          this.msg = 'Something went wrong during deleting designation';
         }
              );
  });		
  } else {
    this.clss = 'rd';
    this.msg = 'You must select at least one designation';
  }
  this.getDesignation();
}
}

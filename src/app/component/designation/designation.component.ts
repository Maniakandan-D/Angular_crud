import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/alertService/alert.service';
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
  //edit
  isLoader: boolean;

  constructor(private designationService: DesignationService, private notifyService : AlertService) { this.isLoader = true; }

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
          this.notifyService.showSuccess("Designation deleted successfully");
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

// inlineEdit
addDepartment(){
  this.designationData['isEdit'] = true;
}
getdesignation(){
  this.isLoader = false;
  this.designationService.getDesignation().subscribe((res: any) => {
   debugger;
   this.designationData = res;
   this.designationData.forEach(element => {
    element['isEdit'] = false;
   });
   this.isLoader = false;
  },error => {
  this.isLoader = false;
  });
}
cancel(data){
  
  data.isEdit = false;
}
getDesignationId(data){
 data.isEdit = true;
 this.designationData;
}
update(rowData){

  //check row data has changed
  
 //validate
 this.designationService
     .getDesignationByName(rowData.designation)
      .subscribe((data: any)=>{

        if(data.length ==0)
        {
              rowData.isEdit = false;
              this.designationService.updateDesignation(rowData).subscribe((updatedData)=>{});
              this.notifyService.showSuccess("Designation updated successfully")      
        }
        else
        {
              this.notifyService.showError(`Designation name already exists..!`)
        }
  });
}
}

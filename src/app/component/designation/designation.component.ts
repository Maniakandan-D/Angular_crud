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
  searchText:any;
  totalLength:any;
  page:number = 1;
  pageSize:number = 5;
  key: string = 'id';
  reverse: boolean = false;
  isLoader: boolean;

  constructor(private designationService: DesignationService, private notifyService : AlertService) { this.isLoader = true; }

  ngOnInit(): void {
    this.getDesignation();
  }

  getDesignation(): void {
    this.designationService.getAll().subscribe((data: Designation[]) => {
      this.designationData = data;
    });
  }

  deleteDesignation(row : any): void{
    if (confirm("Are you sure to delete ?")){
        this.designationService.delete(row.id)
        .subscribe(res => { 
        const index: number = this.designationData.indexOf(row);
        if (index !== -1) {
          this.designationData.splice(index, 1)
          this.notifyService.showSuccess("Designation deleted successfully");
        }    
        });
    }
  }

  sort(key: string): void{
    this.key = key;
    this.reverse = !this.reverse;
  }

  checkAllCheckBox(ev: any): void {
    this.designationData.forEach(x => x.checked = ev.target.checked)
  }

  isAllCheckBoxChecked(): boolean {
    return this.designationData.every(row => row.checked);
  }

  deleteMultiDesignation(): void {
    const selectedDesignation= this.designationData.
    filter(employee => employee.checked).map(row => row.id);
    if(selectedDesignation && selectedDesignation.length > 0) {
      selectedDesignation.forEach(id => {
        this.designationService.delete(id)
        .subscribe({
          next:res => {
            this.notifyService.showSuccess("Designations successfully deleted")
        }, 
          error: err => {
            this.notifyService.showError("Something went wrong during deleting designation")
          }
        });
      });		
    } else {
        this.notifyService.showWarning("You must select at least one designation")
      }
        this.getDesignation();
  }

  addDepartment(): void{
    this.designationData['isEdit'] = true;
  }

cancel(data: { isEdit: boolean;}): void{
  data.isEdit = false;
}

getDesignationId(data: { isEdit: boolean; }): void{
  data.isEdit = true;
  this.designationData;
}

update(rowData: any): void{
  this.designationService.getByName(rowData.designation)
  .subscribe((data: any)=>{
      if(data.length ==0)
        {
          rowData.isEdit = false;
          this.designationService.update(rowData).subscribe((updatedData: any)=>{});
          this.notifyService.showSuccess("Designation updated successfully")      
        }
        else
        {
          this.notifyService.showError(`Designation name already exists..!`)
        }
  });
  }
}

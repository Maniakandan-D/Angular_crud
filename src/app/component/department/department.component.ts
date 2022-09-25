import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/alertService/alert.service';
import { Department } from './shared/department.model';
import { DepartmentService } from './shared/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departmentData: Department[] = [];
  //filter
  searchText:any;
  //pagination
  totalLength:any;
  page:number = 1;
  pageSize:number =5;
  //edit
  isLoader: boolean;
  // sorting
  key: string = 'id';
  reverse: boolean = false;

  constructor(private departmentService: DepartmentService, private notifyService : AlertService) {
    this.isLoader = true;
   }
  
  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.departmentService.getAll().subscribe((data: Department[]) => {
      this.departmentData = data;
    });
  }
  
  deleteDepartment(row : Department): void{
    if (confirm("Are you sure to delete ?")){
    this.departmentService.delete(row.id)
    .subscribe(res => { 
      const index: number = this.departmentData.indexOf(row);
      if (index !== -1) {
          this.departmentData.splice(index, 1)
          this.notifyService.showSuccess("Department deleted successfully");
      }    
    });
   }
  }

  sort(key: string){
    this.key = key;
    this.reverse = !this.reverse;
  }

  checkAllCheckBox(ev: any): void{
    this.departmentData.forEach(x => x.checked = ev.target.checked)
  }

  isAllCheckBoxChecked(): boolean {
    return this.departmentData.every(row => row.checked);
  }

  deleteSelectedDepartment(): void {
    const selectedDepartments= this.departmentData.
    filter(employee => employee.checked).map(row => row.id);
    if(selectedDepartments && selectedDepartments.length > 0) {
    selectedDepartments.forEach(id => {
      this.departmentService.delete(id)
      .subscribe({
        next: res => {
          this.notifyService.showSuccess("Departments deleted successfully")
        },
        error: err => {
          this.notifyService.showError("Something went wrong during deleting department")
        }
      });
    });		
    } else {
        this.notifyService.showWarning("You must select at least one department")
      }
        this.getAll();
  }

  // inlineEdit
    addDepartment(): void{
      this.departmentData['isEdit'] = true;
    }

    cancel(data: any): void{
      data.isEdit = false;
    }

    getDepartmentId(data: { isEdit: boolean; }): void{
      data.isEdit = true;
      this.departmentData;
    }

    update(rowData: any): void{
      this.departmentService.getByName(rowData.name)
      .subscribe((data: any)=>{
          if(data.length == 0)
            {
              rowData.isEdit = false;
              this.departmentService.update(rowData).subscribe((updatedData: any)=>{});
              this.notifyService.showSuccess("Department updated successfully")      
            }
          else
            {
              this.notifyService.showError(`Department name already exists..!`)
            }
        });
    }
}
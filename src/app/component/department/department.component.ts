import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/alertService/alert.service';
import { Department, DepartmentVM } from './shared/department.model';
import { DepartmentService } from './shared/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departmentData: DepartmentVM[] = [];
  searchText:any;
  totalLength:any;
  page:number = 1;
  pageSize:number =5;
  isLoader: boolean;
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
          this.departmentData.splice(index, 1);
          this.notifyService.showSuccess(`Department ${row.name} deleted successfully`);
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
    if (confirm("Are you sure to delete ?")){
    const selectedDepartments= this.departmentData.
    filter(employee => employee.checked);
    if(selectedDepartments && selectedDepartments.length > 0) {
    selectedDepartments.forEach(department => {
      this.departmentService.delete(department.id)
      .subscribe({
        next: res => {
          const index: number = this.departmentData.indexOf(department);
          if (index !== -1) {
              this.departmentData.splice(index, 1);
              this.notifyService.showSuccess(`Department ${department.name} deleted successfully`); // all aler message should have respective names
          }   
        },
        error: err => {
          this.notifyService.showError(`Something went wrong during deleting ${department.name}`)
        }
      });
    });
    }		
  }
     else {
        this.notifyService.showWarning("You must select at least one department")
     }
  }

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

    update(rowData: DepartmentVM): void{
      this.departmentService.getByName(rowData.name.replace(/^\s+|\s+$/gm,''))
      .subscribe((data: Department[])=>{
          if(data.length == 0)
            {
              rowData.isEdit = false;
              this.departmentService.update(rowData).subscribe((updatedData: Department)=>{});
              this.notifyService.showSuccess(`Department ${rowData.name} updated successfully`)      
            }
          else
            {
              this.notifyService.showError(`Department ${rowData.name} already exists..!`)
            }
        });
    }
}
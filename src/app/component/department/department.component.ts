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
  msg: string = '';
  clss: string = '';

  constructor(private departmentService: DepartmentService, private notifyService : AlertService) {
    this.isLoader = true;
   }
  
  ngOnInit(): void {
    this.getDepartment();
  }
  getDepartment() {
    this.departmentService.getDepartment().subscribe((data) => {
      this.departmentData = data;
    });
  }
  deleteDepartment(row : any){
    // add confirmation before deleting 
    if (confirm("Are you sure to delete ?")){
    this.departmentService.delete(row.id)
    .subscribe(res => { 
      const index: number = this.departmentData.indexOf(row);
      if (index !== -1) {
          this.departmentData.splice(index, 1)
          this.notifyService.showSuccess("Department deleted successfully");
      }    

    })
   }
  }

 //sorting
 sort(key){
  this.key = key;
  this.reverse = !this.reverse;
}
 // Multiple delete
 checkAllCheckBox(ev: any) {
  this.departmentData.forEach(x => x.checked = ev.target.checked)
}
isAllCheckBoxChecked() {
  return this.departmentData.every(row => row.checked);
}
deleteSelectedDepartment(): void {
  const selectedDepartments= this.departmentData.
  filter(employee => employee.checked).map(row => row.id);

  if(selectedDepartments && selectedDepartments.length > 0) {
  
    selectedDepartments.forEach(id => {
      this.departmentService.deleteMultiDepartment(id)
      .subscribe(res => {
        this.clss = 'grn';
        this.msg = 'departments successfully deleted';
        }, err => {
          this.clss = 'rd';
          this.msg = 'Something went wrong during deleting department';
                  }
              );
        });		
        } else {
          this.clss = 'rd';
          this.msg = 'You must select at least one department';
       }
          this.getDepartment();
    }
    // inlineEdit
    addDepartment(){
      this.departmentData['isEdit'] = true;
    }
    getdepartment(){
      this.isLoader = false;
      this.departmentService.getDepartment().subscribe((res: any) => {
       debugger;
       this.departmentData = res;
       this.departmentData.forEach(element => {
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
    getDepartmentId(data){
     data.isEdit = true;
     this.departmentData;
    }
    update(rowData){

      //check row data has changed
      
     //validate
     this.departmentService
         .getDepartmentByName(rowData.department)
          .subscribe((data: any)=>{

            if(data.length ==0)
            {
                  rowData.isEdit = false;
                  this.departmentService.update(rowData).subscribe((updatedData)=>{});
                  this.notifyService.showSuccess("Department updated successfully")      
            }
            else
            {
                  this.notifyService.showError(`department name:${{}} already exists..!`)
            }
      });
     //call update service
    
    }
}
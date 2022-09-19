import { Component, OnInit } from '@angular/core';
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
  isEdit: boolean = false;
  //checkbox
  selectedDepartment : Department[];
  // sorting
  key: string = 'id';
  reverse: boolean = false;
  msg: string = '';
  clss: string = '';

  constructor(private departmentService: DepartmentService) { }

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
          this.departmentData.splice(index, 1);
          alert("Department delete successfully")
      }    

    })
   }
  }
  onEdit(item: any) {
    debugger;
    this.departmentData.forEach(element => {
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
}
import { Component, OnInit } from '@angular/core';
import { Employees } from './shared/employee.model';
import { EmployeeService } from './shared/employee.service';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employeeData: Employees[] = [];
   //filter
   searchText:any;
   //pagination
   totalLength:any;
   page:number = 1;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployee();
  }
  getEmployee() {
    this.employeeService.getEmployee().subscribe((data) => {
      this.employeeData = data;
    });
  }
  deleteEmployee(row : any){
    // add confirmation before deleting 
    if (confirm("Are you sure to delete ?")){
    this.employeeService.delete(row.id)
    .subscribe(res => { 
     
    })
    // No need to Refresh
    this.getEmployee();
   }
  }
  // search(){
  //   if (this.name == ""){
  //     this.ngOnInit();
  //   }else{
  //     this.employeeData = this.employeeData.filter(res =>{
  //       return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
  //     })
  //   }
  // }
}

import { Component, OnInit } from '@angular/core';
import { Employees } from './shared/employee.model';
import { EmployeeService } from './shared/employee.service';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employees[] = [];
   //filter
   searchText:any;
   //pagination
   totalLength:any;
   page:number = 1;
   pageSize:number =5;
    // sorting
    key: string = 'id';
    reverse: boolean = false;

    msg: string = '';
    clss: string = '';
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployee();
  }
  getEmployee() {
    this.employeeService.getEmployee().subscribe((data) => {
      this.employees = data;
    });
  }
  deleteEmployee(row : any){
    // add confirmation before deleting 
    if (confirm("Are you sure to delete ?")){
    this.employeeService.delete(row.id)
    .subscribe(res => { 
      const index: number = this.employees.indexOf(row);
      if (index !== -1) {
<<<<<<< HEAD
          this.employees.splice(index, 1)
          alert("Employee delete successfully");
=======
          this.employees.splice(index, 1);
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
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
		this.employees.forEach(x => x.checked = ev.target.checked)
	}
  isAllCheckBoxChecked() {
		return this.employees.every(row => row.checked);
	}
<<<<<<< HEAD
  deleteMultiEmployees(): void {
=======
  deleteEmployees(): void {
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
		const selectedEmployees= this.employees.
    filter(employee => employee.checked).map(row => row.id);
	
		if(selectedEmployees && selectedEmployees.length > 0) {
		
			selectedEmployees.forEach(id => {
				this.employeeService.deleteEmployees(id)
				.subscribe(res => {
					this.clss = 'grn';
					this.msg = 'employees successfully deleted';
					}, err => {
            this.clss = 'rd';
						this.msg = 'Something went wrong during deleting employee';
                    }
                );
		});		
		} else {
			this.clss = 'rd';
			this.msg = 'You must select at least one employee';
		}
		this.getEmployee();
	}
<<<<<<< HEAD
  employee(){
    console.log(Employees)
  }
=======
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
}
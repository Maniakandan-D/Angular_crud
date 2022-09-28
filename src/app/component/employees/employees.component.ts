import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeVM } from './shared/employee.model';
import { EmployeeService } from './shared/employee.service';
import { AlertService } from 'src/app/shared/alertService/alert.service';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: EmployeeVM[] = [];
  searchText:any;
  totalLength:any;
  page:number = 1;
  pageSize:number =5;
  key: string = 'id';
  reverse: boolean = false;

  constructor(private employeeService: EmployeeService,  private notifyService : AlertService) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    this.employeeService.getAll().subscribe((data) => {
      this.employees = data;
    });
  }

  deleteEmployee(row : Employee): void{
    if (confirm("Are you sure to delete ?")){
        this.employeeService.delete(row.id)
        .subscribe(res => { 
          const index: number = this.employees.indexOf(row);
          if (index !== -1) {
            this.employees.splice(index, 1)
            this.notifyService.showSuccess(`Employee ${row.name} deleted successfully`);
          }    
        });
     }
  }

  sort(key: string): void{
    this.key = key;
    this.reverse = !this.reverse;
   }

  checkAllCheckBox(ev: any): void {
		this.employees.forEach(x => x.checked = ev.target.checked)
	}

  isAllCheckBoxChecked(): boolean {
		return this.employees.every(row => row.checked);
	}

  deleteMultiEmployees(): void {
    if (confirm("Are you sure to delete ?")){
		const selectedEmployees= this.employees.
    filter(employee => employee.checked);
		if(selectedEmployees && selectedEmployees.length > 0) {
			selectedEmployees.forEach(employees => {
				this.employeeService.delete(employees.id)
				.subscribe({
          next:res => {
            const index: number = this.employees.indexOf(employees);
            if (index !== -1) {
              this.employees.splice(index, 1);
              this.notifyService.showSuccess(`Employees ${employees.name} deleted successfully`);
            }
					},
          error: err => {
            this.notifyService.showError(`Something went wrong during ${employees.name} deleted..!`)
          }
          });
		  });		
		} else {
			  this.notifyService.showWarning("You must select at least one employee")
		  }
      } 
	}
}
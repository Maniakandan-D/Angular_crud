import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuItems = [
    {linkId: 1, linkName: 'Employees', linkUrl:'employees'},
    {linkId: 2, linkName: 'Department', linkUrl:'department'},
    {linkId: 2, linkName: 'Designation', linkUrl:'designation'},
    {linkId: 2, linkName: 'Status', linkUrl:'status'},
    {linkId: 3, linkName: 'Payroll', linkUrl:'payroll'}
];
  constructor() { }

  ngOnInit(): void {
  }

}

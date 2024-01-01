import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule,MatTableModule,HttpClientModule,MatButtonModule,MatProgressSpinnerModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserManagementComponent {
  public  users:any;
  constructor(private httpClient:HttpClient){}

  ngOnInit(){
    this.fetchUsers();
  }
   public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'maidenName'];
   public headers:string[] = ['Id', 'FirstName', 'lastName', 'maidenName'];
  dataSource:any = [];
  fetchUsers(){
    this.httpClient.get('https://dummyjson.com/users').subscribe(data => {
      console.log(data);
      this.users = data;
      this.dataSource = data;
    })
  }
  toggleRow(element: { expanded: boolean; }) {
    // Uncommnet to open only single row at once
    // ELEMENT_DATA.forEach(row => {
    //   row.expanded = false;
    // })
    element.expanded = !element.expanded
  }

  manageAllRows(flag: boolean) {
    this.users.forEach((row: { expanded: boolean; }) => {
      row.expanded = flag;
    })
  }
  loading = false;

  save(): void {
    this.loading = true;
  }
  
  cancel(){}
}

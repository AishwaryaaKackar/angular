import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private httpClient:HttpClient) { }
  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>("https://dummyjson.com/users");
  }
}

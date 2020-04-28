import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Contacts } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  contacts = {
    'contactsList': [
        {'id': 1, 'name': 'Rajesh', 'city': 'bangalore'},
        {'id': 2, 'name': 'Aarjith', 'city': 'london'},
        {'id': 3, 'name': 'Anjan', 'city': 'california'},
        {'id': 4, 'name': 'David', 'city': 'delhi'}
    ]
  };
  constructor(private http: HttpClient) { }
  /*public getEmployee(): Observable<Contacts>{
    const url ='http://www.mocky.io/v2/5c5d880f3200000e11220880';
    return this.http.get<Contacts>(url)
  }*/
  getContacts(): Observable<Contacts> {
    // send contacts to subscriber
   return of (this.contacts);
   //return this.contacts.contactsList;
  }
}

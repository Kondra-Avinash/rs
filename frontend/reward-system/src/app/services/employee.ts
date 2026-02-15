import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Employee {
  id?: number;
  name: string;
  department: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private baseUrl = `${environment.apiUrl}/api/employees`;

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number, department?: string) {

    let url = `${this.baseUrl}?page=${page}&size=${size}&sortBy=id&direction=asc`;
    
    if (department) {
      url += `&department=${department}`;
    }
  
    return this.http.get<any>(url);
  }



  getAllSimple(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/all`);
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  update(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
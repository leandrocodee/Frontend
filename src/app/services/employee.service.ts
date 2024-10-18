
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Importa catchError para manejar errores
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  readonly URL_API = 'https://backend-iota-six-98.vercel.app/api/empleados';

  constructor(private http: HttpClient) {  
    this.selectedEmployee = new Employee();
    this.employees = [];
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.URL_API);
  }

  postEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.URL_API, employee).pipe(
      catchError(error => {
        console.error('Error al guardar el empleado', error); // Imprime el error en la consola
        return throwError(error); // Lanza el error para que pueda ser manejado en el componente
      })
    );
  }

  putEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.URL_API}/${employee._id}`, employee);
  }

  deleteEmployee(_id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${this.URL_API}/${_id}`);
  }
}

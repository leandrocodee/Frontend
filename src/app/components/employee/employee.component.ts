
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';

declare var M: any; // Esto es para usar Materialize CSS

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'], // Cambié `styleUrl` por `styleUrls`
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  
  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {  
    this.resetForm(); // Llama a resetForm en ngOnInit para inicializar
  }

  agregarEmployee(form?: NgForm) {
    if (form?.valid) { // Verifica si el formulario es válido antes de enviar
      this.employeeService.postEmployee(form.value)
      .subscribe(
        res => {
          this.resetForm(form);
          M.toast({html: 'Guardado satisfactoriamente'});
        },
        err => {
          console.error('Error al guardar el empleado', err);
          M.toast({html: 'Error al guardar, intenta de nuevo'}); // Mensaje de error
        }
      );
    } else {
      M.toast({html: 'Por favor completa todos los campos'}); // Mensaje de validación
    }
  }

  resetForm(form?: NgForm) { 
    if (form) {
      form.reset();
    }
    this.employeeService.selectedEmployee = new Employee(); // Reinicia el empleado seleccionado
  }
}

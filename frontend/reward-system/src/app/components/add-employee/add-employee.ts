import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee';
import { RouterModule, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  templateUrl: './add-employee.html',
  styleUrls: ['./add-employee.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private service: EmployeeService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  isSubmitting = false;


  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  

  submit() {
    if (this.employeeForm.valid) {

      this.isSubmitting = true;

      this.service.create(this.employeeForm.value as Employee).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.snackBar.open('Employee Added Successfully 🎉', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });

          this.router.navigate(['/employees']);
        },

        error: (err) => {
          this.isSubmitting = false;
          const message =
            err.error?.message ||
            (err.error?.errors
              ? Object.values(err.error.errors).join(', ')
              : 'Something went wrong');

          this.snackBar.open(message, 'Close', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

}
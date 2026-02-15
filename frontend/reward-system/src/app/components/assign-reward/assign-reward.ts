import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee';
import { RewardService, Reward } from '../../services/reward';
import { RouterModule, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';




@Component({
  selector: 'app-assign-reward',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatInputModule,MatCardModule,MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './assign-reward.html'
})
export class AssignRewardComponent implements OnInit {
  employees: Employee[] = [];
  rewardForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private rewardService: RewardService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.rewardForm = this.fb.group({
      employeeId: ['', Validators.required],
      rewardName: ['', Validators.required],
      category: ['', Validators.required],   
      dateAwarded: ['', Validators.required]
    });


    this.empService.getAllSimple()
        .subscribe((data: Employee[]) => (this.employees = data));
  }


  submit() {
    if (this.rewardForm.valid) {
      const formValue = {
        ...this.rewardForm.value,
        employeeId: Number(this.rewardForm.value.employeeId)
      };

      this.rewardService.assign(formValue as Reward).subscribe({
        next: () => {
          this.snackBar.open('Reward Assigned Successfully 🎉', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });

          this.router.navigate(['/rewards']);
        },
        error: (err) => {
          this.snackBar.open(
            err.error?.message || 'Something went wrong',
            'Close',
            {
              duration: 4000,
              panelClass: ['error-snackbar']
            }
          );
        }
      });
    }
  }

}
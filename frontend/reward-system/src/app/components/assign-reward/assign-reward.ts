import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee';
import { RewardService, Reward } from '../../services/reward';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './assign-reward.html'
})
export class AssignRewardComponent implements OnInit {

  employees: Employee[] = [];
  rewardForm!: FormGroup;

  isEditMode = false;
  rewardId!: number;

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private rewardService: RewardService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {

    this.rewardForm = this.fb.group({
      employeeId: ['', Validators.required],
      rewardName: ['', Validators.required],
      category: ['', Validators.required],
      dateAwarded: ['', Validators.required]
    });

    // ✅ Load employees
    this.empService.getAllSimple()
      .subscribe((data: Employee[]) => (this.employees = data));

    // ✅ Detect Edit Mode
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.rewardId = +id;

      this.rewardService.getById(this.rewardId)
        .subscribe(data => {

          let patchData: any = { ...data };

          if (data.dateAwarded) {
            const parts = data.dateAwarded.split('-');
            patchData.dateAwarded = new Date(
              Number(parts[0]),
              Number(parts[1]) - 1,
              Number(parts[2])
            );
          }
        
          this.rewardForm.patchValue(patchData);
        });
    }
  }

  submit() {

    if (!this.rewardForm.valid) return;

    const rawDate: Date = this.rewardForm.value.dateAwarded;

    const formValue = {
      ...this.rewardForm.value,
      employeeId: Number(this.rewardForm.value.employeeId),
      dateAwarded: this.formatDate(rawDate)   // 🔥 format properly
    };

    if (this.isEditMode) {

      this.rewardService.update(this.rewardId, formValue as Reward)
        .subscribe({
          next: () => {
            this.snackBar.open('Reward Updated Successfully ✏️', 'Close', {
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

    } else {

      this.rewardService.assign(formValue as Reward)
        .subscribe({
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

  private formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}

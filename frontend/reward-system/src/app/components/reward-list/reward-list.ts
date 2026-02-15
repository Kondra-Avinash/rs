import { Component } from '@angular/core';
import { RewardService, Reward } from '../../services/reward';
import { EmployeeService, Employee } from '../../services/employee';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reward-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './reward-list.html'
})
export class RewardListComponent {

  displayedColumns = ['employee','rewardName','dateAwarded','actions'];

  data$: Observable<{ rewards: Reward[]; employees: Employee[] }>;

  constructor(
    private rewardService: RewardService,
    private employeeService: EmployeeService
  ) {
    this.data$ = forkJoin({
      employees: this.employeeService.getAllSimple(),
      rewards: this.rewardService.getAll()
    });
  }

  getEmployeeName(employeeId: number, employees: Employee[]): string {
    return employees.find(e => e.id === employeeId)?.name || 'Unknown';
  }

  deleteReward(id: number) {
    this.rewardService.delete(id).subscribe(() => {
      // refresh after delete
      this.data$ = forkJoin({
        employees: this.employeeService.getAllSimple(),
        rewards: this.rewardService.getAll()
      });
    });
  }
}

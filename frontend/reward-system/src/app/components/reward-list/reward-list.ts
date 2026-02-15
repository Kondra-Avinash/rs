import { Component } from '@angular/core';
import { RewardService, Reward } from '../../services/reward';
import { EmployeeService, Employee } from '../../services/employee';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reward-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule   
  ],
  templateUrl: './reward-list.html'
})
export class RewardListComponent {

  displayedColumns = ['employee','rewardName','dateAwarded','actions'];

  data$: Observable<{ rewards: Reward[]; employees: Employee[] }>;

  constructor(
    private rewardService: RewardService,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.data$ = forkJoin({
      employees: this.employeeService.getAllSimple(),
      rewards: this.rewardService.getAll()
    });
  }


  getEmployeeName(employeeId: number, employees: Employee[]): string {
    return employees.find(e => e.id === employeeId)?.name || 'Unknown';
  }


  editReward(reward: Reward) {
    this.router.navigate(['/assign-reward', reward.id]);
  }

  loadData() {
    this.data$ = forkJoin({
      employees: this.employeeService.getAllSimple(),
      rewards: this.rewardService.getAll()
    });
  }


  deleteReward(id: number) {

  const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
    width: '400px',
    disableClose: true,
    data: { name: 'this reward' }   
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.rewardService.delete(id).subscribe(() => {
        this.loadData();   
      });
    }
  });
}

}

import { Component } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, switchMap } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,   
    MatSelectModule 
  ],
  templateUrl: './employee-list.html',
  styles: [`
    .employee-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
    }

    .employee-card {
      flex: 0 0 320px;
    }

    mat-paginator {
      margin-top: 30px;
    }
  `]
})
export class EmployeeListComponent {

  private page$ = new BehaviorSubject<{
    page: number,
    size: number,
    department: string
  }>({
    page: 0,
    size: 5,
    department: ''
  });

  employees$ = this.page$.pipe(
    switchMap(p =>
      this.service.getAll(p.page, p.size, p.department)
    )
  );

  constructor(
    private service: EmployeeService,
    private dialog: MatDialog
  ) {}

  onPageChange(event: PageEvent) {
    const current = this.page$.value;
    this.page$.next({
      ...current,
      page: event.pageIndex,
      size: event.pageSize
    });
  }

  onDepartmentChange(dept: any) {
    const current = this.page$.value;
    
    this.page$.next({
      ...current,
      page: 0,
      department: dept ?? ''
    });
  }


  deleteEmployee(id: number, name: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(id).subscribe(() => {
          // trigger reload
          this.page$.next(this.page$.value);
        });
      }
    });
  }
}


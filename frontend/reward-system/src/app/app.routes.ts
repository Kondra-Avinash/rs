import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list';
import { AddEmployeeComponent } from './components/add-employee/add-employee';
import { AssignRewardComponent } from './components/assign-reward/assign-reward';
import { RewardListComponent } from './components/reward-list/reward-list';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' }, 
  { path: 'employees', component: EmployeeListComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'assign-reward', component: AssignRewardComponent },
  { path: 'rewards', component: RewardListComponent },
  { path: 'assign-reward', component: AssignRewardComponent },
  { path: 'assign-reward/:id', component: AssignRewardComponent },

];


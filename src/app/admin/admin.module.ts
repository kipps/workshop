import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent, AdminDashboardComponent, ManageTasksComponent, ManageUsersComponent } from '.';
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [AdminComponent, AdminDashboardComponent, ManageTasksComponent, ManageUsersComponent]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UserComponent, UserArrayService, usersRouterComponents} from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule
  ],
  declarations: [usersRouterComponents, UserComponent],
  providers: [UserArrayService]
})
export class UsersModule { }

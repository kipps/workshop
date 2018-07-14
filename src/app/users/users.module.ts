import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { UsersEffects, usersReducer } from './../core/+store';

import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule, usersRouterComponents } from './users-routing.module';

import { UserComponent, UserArrayService, UserObservableService, UserResolveGuard } from '.';
import { UsersAPIProvider } from './users.config';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    StoreModule.forFeature('users', usersReducer),
    SharedModule,
    EffectsModule.forFeature([UsersEffects])
  ],
  declarations: [
    usersRouterComponents,
    UserComponent,
  ],
  providers: [
    UserArrayService,
    UserObservableService,
    UsersAPIProvider,
    UserResolveGuard
  ]
})
export class UsersModule {}

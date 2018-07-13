import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule, usersRouterComponents } from './users-routing.module';

import { UserComponent, UserArrayService, UserObservableService, UserResolveGuard } from '.';
import { UsersAPIProvider } from './users.config';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from '../core/+store/users/users.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
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

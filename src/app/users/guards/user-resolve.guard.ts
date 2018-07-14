import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { delay, map, catchError, finalize, tap, take } from 'rxjs/operators';

// NgRx
import { Store, select } from '@ngrx/store';
import { AppState, getSelectedUserByUrl } from './../../core/+store';
import * as UsersActions from './../../core/+store/users/users.actions';

import { User } from './../models/user.model';
import { SpinnerService } from '../../core';

@Injectable()
export class UserResolveGuard implements Resolve<User> {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private spinner: SpinnerService
  ) {}

  resolve(): Observable<User> | null {
    console.log('UserResolve Guard is called');
    this.spinner.show();

    return this.store.pipe(
        select(getSelectedUserByUrl),
        tap(user => this.store.dispatch(new UsersActions.SetOriginalUser(user))),
        delay(2000),
        map(user => {
          if (user) {
            return user;
          } else {
            this.router.navigate(['/users']);
            return null;
          }
        }),
        take(1),
        catchError(() => {
          this.router.navigate(['/users']);
          return of(null);
        }),
        finalize(() => this.spinner.hide())
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// rxjs
import { Observable, of } from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {
  DialogService,
  CanComponentDeactivate
} from './../../../core';

import { User } from './../../models/user.model';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, getUsersOriginalUser } from './../../../core/+store';
import * as UsersActions from './../../../core/+store/users/users.actions';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit, CanComponentDeactivate {

  user: User;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private location: Location,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = {...data.user};
    });
  }

  onSaveUser() {
    const user = { ...this.user };

    if (user.id) {
      this.store.dispatch(new UsersActions.UpdateUser(user));
    } else {
      this.store.dispatch(new UsersActions.CreateUser(user));
    }

  }

  goBack() {
    this.location.back();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = [];
    return this.store.pipe(
        select(getUsersOriginalUser),
        switchMap(originalUser => {
          for (const key in originalUser) {
            if (originalUser[key] === this.user[key]) {
              flags.push(true);
            } else {
              flags.push(false);
            }
          }

          if (flags.every(el => el)) {
            return of(true);
          }

          // Otherwise ask the user with the dialog service and return its
          // promise which resolves to true or false when the user decides
          return this.dialogService.confirm('Discard changes?');
        })
    );

  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as UsersActions from './../../../core/+store/users/users.actions';
import { AppState, getUsers, getUsersError, getEditedUser } from './../../../core/+store';

// rxjs
import { Observable, Subscription } from 'rxjs';

import { User } from './../../models/user.model';
import { AutoUnsubscribe } from './../../../core/decorators';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
@AutoUnsubscribe('subscription')
export class UserListComponent implements OnInit {
  users$: Observable<Array<User>>;
  usersError$: Observable<Error | string>;

  private editedUser: User;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.users$ = this.store.pipe(select(getUsers));
    this.usersError$ = this.store.pipe(select(getUsersError));
    this.store.dispatch(new UsersActions.GetUsers());

    // listen editedUserID from UserFormComponent
    this.subscription = this.store.pipe(select(getEditedUser))
        .subscribe(
            user => {
              this.editedUser = user;
              console.log(`Last time you edited user ${JSON.stringify(this.editedUser)}`);
            },
            err => console.log(err)
        );
  }

  onEditUser(user: User) {
    const link = ['/users/edit', user.id];
    this.router.navigate(link);
  }

  isEdited(user: User) {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

  onDeleteUser(user: User) {
    this.store.dispatch(new UsersActions.DeleteUser(user));
  }
}

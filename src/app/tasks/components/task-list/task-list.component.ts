import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

// @Ngrx
import {Store, select} from '@ngrx/store';
import {AppState, getTasksData, getTasksError} from './../../../core/+store';
import {Observable} from 'rxjs';

import {Task} from './../../models/task.model';
import * as TasksActions from './../../../core/+store/tasks/tasks.actions';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<ReadonlyArray<Task>>;
  tasksError$: Observable<Error | string>;



  constructor(private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    console.log('We have a store! ', this.store);
    this.tasks$ = this.store.pipe(select(getTasksData));
    this.tasksError$ = this.store.pipe(select(getTasksError));

    this.store.dispatch(new TasksActions.GetTasks());

  }

  onCreateTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  onCompleteTask(task: Task): void {
    const doneTask = {...task, done: true};
    this.store.dispatch(new TasksActions.UpdateTask(doneTask));

  }

  onEditTask(task: Task): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  onDeleteTask(task: Task) {
    this.store.dispatch(new TasksActions.DeleteTask(task));
    // this.taskPromiseService
    //     .deleteTask(task)
    //     .then(() => (this.tasks = this.tasks.filter(t => t.id !== task.id)))
    //     .catch(err => console.log(err));
  }

}

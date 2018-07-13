import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {TasksEffects, tasksReducer} from './../core/+store';

import {TasksRoutingModule} from './tasks-routing.module';
import {
TaskComponent,
TaskFormComponent,
TaskListComponent,
TaskPromiseService,
} from '.';

@NgModule({
    declarations: [TaskListComponent, TaskFormComponent, TaskComponent],
    imports: [CommonModule, FormsModule, TasksRoutingModule,
        StoreModule.forFeature('tasks', tasksReducer),
        EffectsModule.forFeature([TasksEffects])],
    providers: [TaskPromiseService]
})
export class TasksModule {
}

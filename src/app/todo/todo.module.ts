import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { TodoComponent } from './components/todo/todo.component';
import { TodosComponent } from './components/todos/todos.component';

import * as todos from 'app/todo/reducers/todos';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('todos', todos.reducer)
  ],
  declarations: [
    TodoComponent,
    TodosComponent
  ],
  exports: [
    TodoComponent,
    TodosComponent
  ]
})
export class TodoModule { }

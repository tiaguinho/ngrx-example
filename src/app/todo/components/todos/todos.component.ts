import {
  Component,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from 'app/todo/models/todo';

import * as todo from 'app/todo/actions/todo';
import * as fromTodo from 'app/todo/reducers/todos';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {

  /**
   * receive list of todo's
   */
  @Input() data: Todo[];

  constructor(
    private store: Store<fromTodo.State>
  ) {}

  /**
   * Dispatch a Complete action to change the todo status
   * @param id number
   */
  changeStatus(id: number) {
    this.store.dispatch(new todo.Complete(id));
  }

  /**
   * Dispatch a Select action to change the selectedTodoId
   * This change will reflect on the selector 'getSelectedTodo' that
   * we created on reducers folder.
   * @param id number
   */
  edit(id: number) {
    this.store.dispatch(new todo.Select(id));
  }

  /**
   * Dispatch a Delete action to remove a entity from the state
   * @param id number
   */
  delete(id: number) {
    this.store.dispatch(new todo.Delete(id));
  }

}

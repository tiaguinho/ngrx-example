import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from 'app/todo/models/todo';

import * as todo from 'app/todo/actions/todo';
import * as fromTodo from 'app/todo/reducers/todos';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {

  @Input() todo: Todo;

  constructor(
    private store: Store<fromTodo.State>
  ) {}

  changeStatus(id: number) {
    this.store.dispatch(new todo.Done(id));
  }

}

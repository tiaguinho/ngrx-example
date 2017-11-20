import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Todo } from 'app/todo/models/todo';
import * as todo from 'app/todo/actions/todo';
import * as fromTodos from 'app/todo/reducers/todos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  todos: Observable<Todo[]>;

  todoForm = new FormGroup({
    task: new FormControl()
  });

  constructor(private store: Store<fromTodos.State>) {
    this.todos = store.select(fromTodos.getTodosAll);
  }

  add(): void {
    const data: Todo = this.todoForm.value;
    data.id = new Date().getMilliseconds();
    data.done = false;

    this.store.dispatch(new todo.Add(data));
  }

}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Todo } from 'app/models/todo';
import * as fromTodos from 'app/reducers/todos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  todos: Observable<Todo>;

  constructor(store: Store<fromTodos.State>) {

  }

}

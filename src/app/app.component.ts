import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
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
export class AppComponent implements OnInit {

  /**
   * Observable list of todo
   */
  todos: Observable<Todo[]>;

  /**
   * Reactive form
   */
  form: FormGroup;

  constructor(
    private store: Store<fromTodos.State>,
    private formBuilder: FormBuilder
  ) {
    this.todos = store.select(fromTodos.getTodosAll);
  }

  ngOnInit() {
    // crate reactive form
    this.form = this.formBuilder.group({
      id: [''],
      task: ['', Validators.required],
      complete: ['']
    });

    // subscribe to receive selected todo
    this.store.select(fromTodos.getSelectedTodo).subscribe(todo => {
      if (!todo) return;

      this.form.setValue(todo);
    });
  }

  /**
   * Submit the form
   * @param { value, valid }: { value: Todo, valid: boolean }
   */
  onSubmit({value, valid}: {value: Todo, valid: boolean}): void {
    if (valid) {
      // dispatch new action
      this.store.dispatch(new todo.Save(value));
      this.form.reset();
    }
  }

}

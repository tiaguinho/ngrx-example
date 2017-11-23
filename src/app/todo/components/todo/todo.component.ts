import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { Todo } from 'app/todo/models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {

  /**
   * Receive the todo
   */
  @Input() todo: Todo;

}

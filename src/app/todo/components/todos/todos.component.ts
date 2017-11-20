import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit
} from '@angular/core';
import { Todo } from 'app/todo/models/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {

  @Input() data: Todo[];

  constructor() { }

  ngOnInit() {
  }

}

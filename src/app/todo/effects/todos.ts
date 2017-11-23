import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as todo from '../actions/todo';

@Injectable()
export class TodoEffects {

    /**
     * This type of effect is called Content-Based decider.
     * We use this type of effect to decide, based on the content we receive,
     * witch is the right action to handle the content.
     */
    @Effect()
    $save = this.actions
        .ofType<todo.Save>(todo.SAVE_TODO)
        .map(action => action.todo)
        .switchMap(data => {
            let action: Action;
            if (!data.id) {
                action = new todo.Add(data);
            } else {
                action = new todo.Edit(data.id, data);
            }

            return of(action);
        });

    /**
     * This type is the Filtering decider.
     * This is the most common type of decider.
     */
    @Effect()
    $add = this.actions
        .ofType<todo.Add>(todo.ADD_TODO)
        .map(action => action.todo)
        .switchMap((data) => {
            // this dumb implementation in real world can be a http request
            data.id = new Date().getMilliseconds();
            data.complete = false;

            return of(new todo.AddTodoSuccess(data));
        });

    constructor(
        private actions: Actions
    ) {}

}

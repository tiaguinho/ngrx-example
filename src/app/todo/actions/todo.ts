import { Action } from '@ngrx/store';
import { Todo } from 'app/todo/models/todo';

export const ADD_TODO = '[TODO] add todo';
export const EDIT_TODO = '[TODO] edit todo';
export const DELETE_TODO = '[TODO] delete todo';
export const DONE_TODO = '[TODO] done todo';
export const SELECT_TODO = '[TODO] select todo';

export class Add implements Action {
    readonly type = ADD_TODO;

    constructor(public todo: Todo) {}
}

export class Edit implements Action {
    readonly type = EDIT_TODO;

    constructor(public id: number, public changes: Partial<Todo>) {}
}

export class Delete implements Action {
    readonly type = DELETE_TODO;

    constructor(public id: number) {}
}

export class Done implements Action {
    readonly type = DONE_TODO;

    constructor(public id: number) {}
}

export class Select implements Action {
    readonly type = SELECT_TODO;

    constructor(public id: number) {}
}

export type Actions = Add | Edit | Delete | Done | Select;
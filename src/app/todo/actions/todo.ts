import { Action } from '@ngrx/store';
import { Todo } from 'app/todo/models/todo';

/**
 * All the constants to define our actions
 */
export const SAVE_TODO = '[TODO] save todo';
export const ADD_TODO = '[TODO] add todo';
export const ADD_TODO_SUCCESS = '[TODO] add todo success';
export const EDIT_TODO = '[TODO] edit todo';
export const DELETE_TODO = '[TODO] delete todo';
export const COMPLETE_TODO = '[TODO] done todo';
export const SELECT_TODO = '[TODO] select todo';

/**
 * Implementation of all actions that we are handle
 */
export class Save implements Action {
    readonly type = SAVE_TODO;

    constructor(public todo: Todo) {}
}

export class Add implements Action {
    readonly type = ADD_TODO;

    constructor(public todo: Todo) {}
}

export class AddTodoSuccess implements Action {
    readonly type = ADD_TODO_SUCCESS;

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

export class Complete implements Action {
    readonly type = COMPLETE_TODO;

    constructor(public id: number) {}
}

export class Select implements Action {
    readonly type = SELECT_TODO;

    constructor(public id: number) {}
}

export type Actions = 
                Save | 
                Add | 
                AddTodoSuccess |
                Edit | 
                Delete | 
                Complete | 
                Select;
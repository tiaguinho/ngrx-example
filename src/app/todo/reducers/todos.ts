import { createSelector, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Todo } from 'app/todo/models/todo';

import * as todo from '../actions/todo';

// create new state based on EntityState
export interface State extends EntityState<Todo> {
    selectedTodoId: number | null;
}

// create new adapter
export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
    selectId: (todo: Todo) => todo.id
});

// set the initial state of the app
export const initialState: State = adapter.getInitialState({
    selectedTodoId: null,
    ids: []
})

// this function is called after every execution of a action
export function reducer(
    state = initialState,
    action: todo.Actions
): State {

    switch(action.type) {

        case todo.ADD_TODO_SUCCESS: {
            return adapter.addOne(action.todo, state);
        }

        case todo.EDIT_TODO: {
            return adapter.updateOne({
                id: action.id,
                changes: action.changes
            }, state);
        }

        case todo.DELETE_TODO: {
            return adapter.removeOne(action.id, state);
        }

        case todo.COMPLETE_TODO: {
            return adapter.updateOne({
                id: action.id,
                changes: { complete: !state.entities[action.id].complete }
            }, state);
        }

        case todo.SELECT_TODO: {
            return {
                ...state,
                selectedTodoId: action.id
            };
        }

        default: {
            return state;
        }
    }

}

export const selectedId = (state: State) => state.selectedTodoId;

// selectors
export const getTodosState = createFeatureSelector<State>('todos');

/**
 * Create new selector to watch changes on entities
 */
export const getTodosEntitiesState = createSelector(
    getTodosState,
    state => state.entities
);

/**
 * Create new selector to watch change on selectedTodoId.
 * Feel lines above, you can see where we create the const selectedId
 */
export const getSelectedId = createSelector(
    getTodosState,
    selectedId
);

/**
 * This is the basics selectors that we can create using the adapter.
 * This is only possible if you are using @ngrx/entity. Without @ngrx/entity,
 * you have to create every selector you want.
 */
export const {
    selectIds: getTodosIds,
    selectEntities: getTodosEntities,
    selectAll: getTodosAll,
    selectTotal: getTodosTotal
} = adapter.getSelectors(getTodosState);

/**
 * Create new selector to whatch changes on selectedId
 * and return the entity of that id
 */
export const getSelectedTodo = createSelector(
    getTodosEntitiesState,
    getSelectedId,
    (entities, id) => {
        return entities[id] || null
    }
)

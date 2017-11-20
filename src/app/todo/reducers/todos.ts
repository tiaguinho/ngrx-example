import { createSelector, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Todo } from 'app/todo/models/todo';
import * as todo from '../actions/todo';

export interface State extends EntityState<Todo> {
    selectedTodoId: number | null;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
    selectId: (todo: Todo) => todo.id
});

export const initialState: State = adapter.getInitialState({
    selectedTodoId: null,
    ids: []
})

export function reducer(
    state = initialState,
    action: todo.Actions
): State {

    switch(action.type) {

        case todo.ADD_TODO: {
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

        case todo.DONE_TODO: {
            return adapter.updateOne({
                id: action.id,
                changes: { done: !state.entities[action.id].done }
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

export const getSelectedId = (state: State) => state.selectedTodoId;

// selectors
export const getTodosState = createFeatureSelector<State>('todos');

export const getTodosEntitiesState = createSelector(
    getTodosState,
    state => state.entities
);

export const {
    selectIds: getTodosIds,
    selectEntities: getTodosEntities,
    selectAll: getTodosAll,
    selectTotal: getTodosTotal
} = adapter.getSelectors(getTodosState);

export const getSelectedTodo = createSelector(
    getTodosEntitiesState,
    getSelectedId,
    (entities, id) => entities[id]
)

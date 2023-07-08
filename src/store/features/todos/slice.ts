import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITodosListsState } from './types';

const initialState: ITodosListsState = {
  lists: [],
};

const todosListsSlice = createSlice({
  name: 'todosLists',
  initialState,
  reducers: {
    addTodoList(state, action: PayloadAction<string>) {
      state.lists.push({
        id: Math.round(Math.random() * 10000).toString(),
        items: [],
        name: action.payload,
      });
    },
    removeTodoList(state, action) {
      state.lists = state.lists.filter((todoList) => todoList.id !== action.payload);
    },
    addTodoItem(state, action: PayloadAction<{ listId: string; text: string }>) {
      const { listId, text } = action.payload;

      const listIndex = state.lists.findIndex((todoList) => todoList.id === listId);

      if (listIndex >= 0) {
        state.lists[listIndex].items.push({
          id: Math.round(Math.random() * 10000).toString(),
          name: text,
          checked: false,
        });
      }
    },
    removeTodoItem(state, action: PayloadAction<{ listId: string; todoId: string }>) {
      const { listId, todoId } = action.payload;

      const listIndex = state.lists.findIndex((todoList) => todoList.id === listId);

      if (listIndex >= 0) {
        state.lists[listIndex].items = state.lists[listIndex].items.filter((todoItem) => todoItem.id !== todoId);
      }
    },
    updateTodoItem(state, action: PayloadAction<{ listId: string; todoId: string; text: string }>) {
      const { listId, todoId, text } = action.payload;

      const listIndex = state.lists.findIndex((todoList) => todoList.id === listId);

      if (listIndex >= 0) {
        const todoIndex = state.lists[listIndex].items.findIndex((todoItem) => todoItem.id === todoId);

        if (todoIndex >= 0) {
          state.lists[listIndex].items[todoIndex].name = text;
        }
      }
    },
    moveElement(state, action: PayloadAction<{ listId: string; fromIndex: number; toIndex: number }>) {
      const { listId, fromIndex, toIndex } = action.payload;

      const listIndex = state.lists.findIndex((todoList) => todoList.id === listId);

      if (listIndex >= 0) {
        const [removed] = state.lists[listIndex].items.splice(fromIndex, 1);
        state.lists[listIndex].items.splice(toIndex, 0, removed);
      }
    },
    toggleTodoItem(state, action: PayloadAction<{ listId: string; todoId: string }>) {
      const { listId, todoId } = action.payload;

      const listIndex = state.lists.findIndex((todoList) => todoList.id === listId);

      if (listIndex >= 0) {
        const todoIndex = state.lists[listIndex].items.findIndex((todoItem) => todoItem.id === todoId);

        if (todoIndex >= 0) {
          state.lists[listIndex].items[todoIndex].checked = !state.lists[listIndex].items[todoIndex].checked;
        }
      }
    },
  },
});

export const { addTodoList, removeTodoList, addTodoItem, removeTodoItem, updateTodoItem, moveElement, toggleTodoItem } =
  todosListsSlice.actions;

export default todosListsSlice.reducer;

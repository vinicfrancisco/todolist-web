export interface ITodoItem {
  id: string;
  name: string;
  checked: boolean;
}

export interface ITodoList {
  id: string;
  name: string;
  items: ITodoItem[];
}

export interface ITodosListsState {
  lists: ITodoList[];
}

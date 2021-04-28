import { Observable, of } from "rxjs";
import { Todo } from "src/app/types/todo";

export const mockTodos: Todo[] = [
  {
    done: false,
    id: 1,
    name: 'Test TODO'
  },
  {
    done: true,
    id: 1,
    name: 'Test TODO 2'
  }
]


export const mockTodoHttpService = {
  getTodos(): Observable<Todo[]> {
    return of(mockTodos)
  }
}


export const mockTodoService = {
  requestTodos() {},
  getTodos() {
    return of(mockTodos)
  },
  deleteTodo(id) {},
  toggleCheck(id) {},
  copy(id) {}
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Todo } from '../types/todo'
import { TodoHttpService } from './todo-http.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList$ = new BehaviorSubject<Todo[]>([])

  constructor(private todoHttp: TodoHttpService) { }

  getTodos(): Observable<Todo[]> {
    return this.todoList$.asObservable()
  }

  requestTodos(): void {
    this.todoHttp.getTodos().toPromise().then(res => {
      this.todoList$.next(res)
    })
  }

  toggleCheck(id): void {
    this.todoList$.next(this.todoList$.value.map(todo => {
      if (id === todo.id) {
        return {
          ...todo,
          done: !todo.done
        }
      }
      return todo
    }))
  }

  deleteTodo(id): void {
    this.todoList$.next(this.todoList$.value.filter(todo => todo.id !== id));
  }

  copy(id): void {
    console.log(id);

    const todo = this.todoList$.value.find(todo => todo.id === id);
    this.todoList$.next([...this.todoList$.value, {
      ...todo,
      name: `${todo.name} (copy)`
    }])
  }
}

import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { mockTodoHttpService, mockTodos } from '../testing/mock/todo';
import { TodoHttpService } from './todo-http.service';
import { TodoService } from './todo.service';



describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService,
        {
          provide: TodoHttpService,
          useValue: mockTodoHttpService
        }
      ]
    });
    service = TestBed.inject(TodoService)
  });

  it('requestTodos() should call TodoHttpService.getTodos and populate todoList$', fakeAsync(() => {
    let getTodosSpy = spyOn(mockTodoHttpService, 'getTodos').and.callThrough()
    service.requestTodos();
    expect(getTodosSpy).toHaveBeenCalledTimes(1)
    tick(1)
    expect(service.todoList$.value).toEqual(mockTodos)
  }));

});

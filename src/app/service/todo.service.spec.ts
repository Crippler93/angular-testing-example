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
    // Arrage
    let getTodosSpy = spyOn(mockTodoHttpService, 'getTodos').and.callThrough()

    // Act
    service.requestTodos();
    tick(1)

    // Assert
    expect(getTodosSpy).toHaveBeenCalledTimes(1)
    expect(service.todoList$.value).toEqual(mockTodos)
  }))

  it('should toggle check property of state array item calling toggleCheck(id)', fakeAsync(() => {
    // Arrange
    service.requestTodos();
    tick(1)
    expect(service.todoList$.value[0].done).toBeFalse()

    // Act
    service.toggleCheck(service.todoList$.value[0].id)
    tick(1)


    // Assert
    expect(service.todoList$.value[0].done).toBeTrue()
  }))

  it('should delete one item from array calling deleteTodo(id)', fakeAsync(() => {
    // Arrange
    service.requestTodos();
    tick(1)
    expect(service.todoList$.value.length).toBe(2)

    // Act
    service.deleteTodo(service.todoList$.value[0].id)
    tick(1)

    // Assert
    expect(service.todoList$.value.length).toBe(1)
  }))
})


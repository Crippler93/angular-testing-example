import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { TodoHttpService } from './todo-http.service';
import { mockTodos } from '../testing/mock/todo';

describe('TodoHttpService', () => {
  let service: TodoHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoHttpService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TodoHttpService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('getTodos() should do a GET request', () => {
    service.getTodos().subscribe(response => {
      expect(response[0]).toEqual(mockTodos[0])
      expect(response[1]).toEqual(mockTodos[1])
    })

    const request = httpMock.expectOne('/api/todos')

    expect(request.request.method).toBe('GET')

    request.flush(mockTodos);
  });
});

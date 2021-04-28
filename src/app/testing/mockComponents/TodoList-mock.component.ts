import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { Observable } from 'rxjs';

import { TodoListComponent } from 'src/app/container/todo-list/todo-list.component';
import { Todo } from 'src/app/types/todo';
import { todoServiceSpy } from '../spy/todoServiceSpy';

@Component({
  selector: 'app-todo-list',
  template: ''
})
export class MockTodoListComponent extends TodoListComponent {
  faPlus: IconDefinition;
  todoList$: Observable<Todo[]>;

  constructor() {
    super(todoServiceSpy)
  }

  ngOnInit(): void {

  }

  handleDeleteClick(id) {
  }

  handleCheck(id) {
  }

  handleCopy(id) {
  }

}

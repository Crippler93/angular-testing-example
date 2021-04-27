import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { TodoService } from 'src/app/service/todo.service';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  faPlus = faPlus
  todoList$: Observable<Todo[]>

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.requestTodos();

    this.todoList$ = this.todoService.getTodos()
  }

  handleDeleteClick(id) {
    this.todoService.deleteTodo(id)
  }

  handleCheck(id) {
    this.todoService.toggleCheck(id)
  }

  handleCopy(id) {
    this.todoService.copy(id)
  }

}

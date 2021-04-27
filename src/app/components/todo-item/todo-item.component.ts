import { Component, EventEmitter, Input, Output } from '@angular/core'
import { faTrash, faCheck, faCopy } from '@fortawesome/free-solid-svg-icons'

import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo: Todo
  @Output() deleteClicked = new EventEmitter<number>()
  @Output() checked = new EventEmitter<number>()
  @Output() copied = new EventEmitter<number>()
  faTrash = faTrash
  faCheck = faCheck
  faCopy = faCopy

  handleCheckClick(id) {
    this.checked.emit(id)
  }

  handleDeleteClick(id) {
    this.deleteClicked.emit(id)
  }

  handleCopyClick(id) {
    this.copied.emit(id)
  }
}

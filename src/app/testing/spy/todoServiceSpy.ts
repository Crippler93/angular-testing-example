import { of } from "rxjs"
import { mockTodos } from "../mock/todo"

export const todoServiceSpy = jasmine.createSpyObj('TodoService', [
  'requestTodos',
  'getTodos',
  'deleteTodo',
  'toggleCheck',
  'copy'
])
todoServiceSpy.getTodos.and.returnValue(of(mockTodos))

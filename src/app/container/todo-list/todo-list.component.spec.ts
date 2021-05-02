import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { TodoItemComponent } from 'src/app/components/todo-item/todo-item.component';
import { TodoService } from 'src/app/service/todo.service';
import { TodoListComponent } from './todo-list.component';
import { mockTodos } from '../../testing/mock/todo'
import { Todo } from 'src/app/types/todo';
import { DebugElement } from '@angular/core';
import { todoServiceSpy } from 'src/app/testing/spy/todoServiceSpy';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent, TodoItemComponent ],
      providers: [{
        provide: TodoService,
        useValue: todoServiceSpy
      }],
      imports: [FontAwesomeModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  it('should render list of todos', () => {
    //Arrange
    let itemsEl: DebugElement[]

    //Act
    fixture.detectChanges()
    itemsEl = fixture.debugElement.queryAll(By.css('app-todo-item'))

    //Assert
    expect(itemsEl.length).toBe(mockTodos.length)
    itemsEl.forEach((item, index) => {
      const todoItemTextEl = item.query(By.css('div.todo-item-text'))
      expect(todoItemTextEl.nativeElement.textContent.trim()).toBe(mockTodos[index].name)
    })
  });

  it('should call deleteTodo with right parameter after click delete icon', () => {
    //Arrange
    let deleteIconEl: DebugElement
    const firstTodo = mockTodos[0]
    let todoItemComponentEl: DebugElement
    //Act
    fixture.detectChanges()
    todoItemComponentEl = fixture.debugElement.query(By.directive(TodoItemComponent))
    deleteIconEl = todoItemComponentEl.query(By.css('.todo-item-action.delete'))
    deleteIconEl.triggerEventHandler('click', {})

    //Assert
    expect(todoServiceSpy.deleteTodo).toHaveBeenCalledWith(firstTodo.id)
  })

  it('should call toggleCheck with right parameter after click check icon', () => {
    //Arrange
    let todoItemComponentEl: DebugElement []
    let checkButtonEl: DebugElement
    const secondItem = mockTodos[1]
    //Act
    fixture.detectChanges()
    todoItemComponentEl = fixture.debugElement.queryAll(By.directive(TodoItemComponent))
    checkButtonEl = todoItemComponentEl[1].query(By.css('.todo-item-action.check'))
    checkButtonEl.triggerEventHandler('click', {})

    //Assert
    expect(todoServiceSpy.toggleCheck).toHaveBeenCalledWith(secondItem.id)
  })
});


describe('Isolated TodoListComponent', () => {
  let component: TodoListComponent

  beforeEach(() => {
    component = new TodoListComponent(todoServiceSpy)
  })

  it('should request Todos and assign todoList$ property calling ngOnInit()', () => {
    //Arrange
    todoServiceSpy.getTodos.and.returnValue(of(mockTodos))
    expect(component.todoList$).toBeUndefined()

    //Act
    component.ngOnInit()

    //Assert
    expect(component.todoList$).toBeDefined()
    component.todoList$.toPromise().then((todos: Todo[]) => {
      expect(todos).toEqual(mockTodos)
    })
    expect(todoServiceSpy.getTodos).toHaveBeenCalled()
    expect(todoServiceSpy.requestTodos).toHaveBeenCalled()
  })

  it('should call deleteTodo with right parameter from todoService calling handleDeleteClick(id)', () => {
    //Arrange
    const id = 25

    //Act
    component.handleDeleteClick(id)

    //Assert
    expect(
      todoServiceSpy.deleteTodo
    ).toHaveBeenCalledWith(id)
  })

  it('should call toggleCheck with right parameter from todoService calling handleCheck(id)', () => {
    //Arrange
    const id = 25

    //Act
    component.handleCheck(id)

    //Assert
    expect(
      todoServiceSpy.toggleCheck
    ).toHaveBeenCalledWith(id)
  })

  it('should call handleCopy with right parameter from todoService calling handleCopy(id)', () => {
    //Arrange
    const id = 25

    //Act
    component.handleCopy(id)

    //Assert
    expect(
      todoServiceSpy.copy
    ).toHaveBeenCalledWith(id)
  })
})

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { mockTodos } from 'src/app/testing/mock/todo';

import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent isolated', () => {
  let component: TodoItemComponent
  // Inputs
  // Setup spies
  let checkedSpy: jasmine.Spy
  let deleteClickedSpy: jasmine.Spy

  beforeEach(() => {
    component = new TodoItemComponent()
    component.todo = mockTodos[0]
    checkedSpy = spyOn(component.checked, 'emit')
    deleteClickedSpy = spyOn(component.deleteClicked, 'emit')
  })

  it('should call emit after calling handleCheckClick(id)', () => {
    // Arrange
    const id = 3

    // Act
    component.handleCheckClick(3)

    // Assert
    expect(checkedSpy).toHaveBeenCalledWith(id)
  })

  it('should call emit after calling handleCheckClick(id)', () => {
    // Arrange
    const id = 6

    // Act
    component.handleDeleteClick(6)

    // Assert
    expect(deleteClickedSpy).toHaveBeenCalledWith(id)
  })

})

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let mockTodo = mockTodos[0]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ],
      imports: [FontAwesomeModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = mockTodo
  });

  it('should render a description and two buttons of one todo', () => {
    // Arrange
    component.todo = {
      name: 'Clean my room',
      id: 33,
      done: true
    }

    // Act
    fixture.detectChanges()
    const description = fixture.debugElement.query(By.css('.todo-item-text'))
    const buttonCheck = fixture.debugElement.query(By.css('.todo-item-action.check'))
    const buttonDelete = fixture.debugElement.query(By.css('.todo-item-action.delete'))

    // Assert
    expect(description.nativeElement.textContent.trim()).toBe('Clean my room')
    expect(buttonCheck).toBeDefined()
    expect(buttonDelete).toBeDefined()
  });

  it('should add checked class in description if todo is done', () => {
    // Arrange
    let description: DebugElement
    component.todo = {
      name: 'Read my favorite book',
      id: 20,
      done: true
    }
    // Act
    fixture.detectChanges()
    description = fixture.debugElement.query(By.css('.todo-item-text'))
    const descriptionEl = description.nativeElement as HTMLDivElement

    // Assert
    expect(descriptionEl.classList.contains('checked')).toBeTruthy()
  })
});

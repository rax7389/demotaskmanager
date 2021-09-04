import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { KanbanColumns } from './model/kanban-columns.model';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit, AfterViewInit {
  constructor() {}

  @ViewChild('defaultTemplateRef', { read: TemplateRef }) defaultTemplateRef;

  @Input() kanbanColumns: Array<KanbanColumns> = [
    new KanbanColumns('Ideas', [
      'Some random idea',
      'This is another random idea',
      'build an awesome application',
    ]),
    new KanbanColumns('Research', [
      'Lorem ipsum',
      'foo',
      "This was in the 'Research' column",
    ]),
    new KanbanColumns('Todo', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep',
    ]),
    new KanbanColumns('Done', [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog',
      'Walk dog',
      'Walk dog',
      'Walk dog',
      'Walk dog',
      'Walk dog',
      'Walk dog',
      'Walk dog',
    ]),
  ];

  ngOnInit() {}
  ngAfterViewInit() {
    this.kanbanColumns = this.kanbanColumns.map((column) => {
      if (isEmpty(column.templateRef)) {
        column.templateRef = this.defaultTemplateRef;
      }
      return column;
    });
  }

  dropKanban(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

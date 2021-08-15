import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanComponent } from './components/kanban/kanban.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    FlexLayoutModule
     ],
  declarations: [KanbanComponent],
  exports: [KanbanComponent],
})
export class CoreModule {}

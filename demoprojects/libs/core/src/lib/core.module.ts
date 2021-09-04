import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanComponent } from './components/kanban/kanban.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastComponent } from './components/toast/toast.component';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  imports: [CommonModule, DragDropModule, FlexLayoutModule,MatIconModule, MatSnackBarModule],
  declarations: [KanbanComponent, ToastComponent],
  exports: [KanbanComponent],
})
export class CoreModule {}

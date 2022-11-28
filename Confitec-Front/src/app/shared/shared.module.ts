import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateInputComponent } from './date-input/date-input.component';
import { ModalComponent } from './modal/modal.component';
import { ModalConfirmComponent } from './modal/modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [DateInputComponent, ModalComponent, ModalConfirmComponent],
  imports: [CommonModule, FormsModule, NgbModule],
  exports: [DateInputComponent, ModalComponent, ModalConfirmComponent],
})
export class SharedModule {}

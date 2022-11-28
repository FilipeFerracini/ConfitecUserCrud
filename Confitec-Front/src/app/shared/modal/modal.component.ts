import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalConfigModel } from './models/ModalConfig.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() public modalConfig: ModalConfigModel | undefined;
  @ViewChild('modals') public modalContent:
    | TemplateRef<ModalComponent>
    | undefined;
  @Output() saveEvent = new EventEmitter();
  @Output() closeEvent = new EventEmitter();
  private modalRef: NgbModalRef | undefined;

  @Input() ngbModalOptions: NgbModalOptions = {
    centered: true,
  };

  constructor(private modalService: NgbModal) {
    this.modalConfig = new ModalConfigModel();
  }

  ngOnInit(): void {}

  open() {
    this.modalRef = this.modalService.open(
      this.modalContent,
      this.ngbModalOptions
    );
  }

  buttonSave() {
    this.saveEvent.emit();
  }

  close(): void {
    if (this.modalConfig?.useEventEmitterClose) this.closeEvent.emit();
    else this.closeModal();
  }

  closeModal() {
    this.modalRef?.close();
  }
}

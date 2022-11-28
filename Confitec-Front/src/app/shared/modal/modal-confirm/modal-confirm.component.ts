import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css'],
})
export class ModalConfirmComponent implements OnInit {
  @ViewChild('content', { static: false }) modalConfirm: ElementRef | undefined;
  @Output() btnOkReturn = new EventEmitter();
  @Output() btnCancelReturn = new EventEmitter();
  @Input() modalTitle: string = '';
  @Input() modalText: string = '';
  @Input() warning: boolean = false;

  private modalConfirmComponentRef: NgbModalRef | undefined;

  @Input() ngbModalOptions: NgbModalOptions = {
    windowClass: 'custom-modal',
    centered: true,
  };

  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {}

  setModalOptions(ngbModalOptions: NgbModalOptions) {
    this.ngbModalOptions = ngbModalOptions;
  }

  setTitle(title: string) {
    this.modalTitle = title;
  }

  setMessage(text: string) {
    this.modalText = text;
  }

  cancel() {
    this.btnCancelReturn.emit();
  }

  confirm() {
    this.btnOkReturn.emit();
  }

  closeModal() {
    if (this.modalConfirmComponentRef !== undefined)
      this.modalConfirmComponentRef.close();
  }

  openModal() {
    this.modalConfirmComponentRef = this.modalService.open(
      this.modalConfirm,
      this.ngbModalOptions
    );
  }
}

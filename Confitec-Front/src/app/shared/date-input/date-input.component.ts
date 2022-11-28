import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
})
export class DateInputComponent implements OnInit {
  @Input() enableReadOnly: boolean = true;
  @Input() showClearData: boolean = true;
  @Output() dateSelectedEvent = new EventEmitter<NgbDateStruct>();

  public model: NgbDateStruct | undefined;

  onDateSelected() {
    this.dateSelectedEvent.emit(this.model);
  }

  clearData() {
    this.model = undefined;
    this.dateSelectedEvent.emit(this.model);
  }

  setDateEmission(event: any) {
    event.target.value;
  }
  constructor() {}

  ngOnInit(): void {}
}

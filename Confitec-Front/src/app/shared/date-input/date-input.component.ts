import { TranslationWidth } from '@angular/common';
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';


const I18N_VALUES = {
  pt: {
      weekdays: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
      months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  },
  en: {
      weekdays: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
      months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  },
  fr: {
    weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
  }
};

// Define a service holding the language. You probably already have one if your app is i18ned.
@Injectable()
export class I18n {
language:string = 'pt';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n
{
  constructor(private _i18n: I18n) {
      super();
  }

  getWeekdayLabel(weekday: number, width?: TranslationWidth | undefined): string
  {
      return I18N_VALUES[this._i18n.language as keyof typeof I18N_VALUES].weekdays[weekday - 1];
  }
  getMonthShortName(month: number, year?: number | undefined): string {
      return I18N_VALUES[this._i18n.language as keyof typeof I18N_VALUES].months[month - 1];
  }
  getMonthFullName(month: number, year?: number | undefined): string {
     return this.getMonthShortName(month);
  }
  getDayAriaLabel(date: NgbDateStruct): string {
      return `${date.day}-${date.month}-${date.year}`;
  }
}
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}
@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
  ],
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
  constructor(
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>
  ) {}

  ngOnInit(): void {}
}

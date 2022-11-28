import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class BaseService {
  protected url: string = environment.api;
  protected controller: string = '';

  constructor(protected router: Router, protected toastr: ToastrService) {
    this.controller = this.getController();
  }

  protected abstract getController(): string;

  protected showMessageError(message: string) {
    this.toastr.error(message, '', {
      positionClass: 'toast-bottom-right',
      onActivateTick: true,
    });
  }

  protected extractData(response: any) {
    return response.data || {};
  }

  protected getUrl(): string {
    return this.url + this.controller;
  }

  public serviceError(response: Response | any, toastr: ToastrService) {
    let showErrors: string = '';
    if (!response.error?.errors) {
      if (response.message) showErrors = response.message;
    } else {
      for (let index = 0; index < response.error?.errors?.length; index++) {
        const element = response.error.errors[index];
        showErrors += element.message + '\n';
      }
    }

    this.showMessageError(showErrors);

    return throwError(response);
  }
}

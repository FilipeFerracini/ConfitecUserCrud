import { Injectable, TemplateRef, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: boolean = true;
  public loadingTemplate: TemplateRef<any> | any;

  @Output()
  event: EventEmitter<any> = new EventEmitter<any>(true);

  getLoading() {
    return this.loading;
  }

  public show() {
    this.event.emit(true);
  }

  offLoading() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  onLoading() {
    setTimeout(() => {
      this.loading = true;
    }, 500);
  }
}

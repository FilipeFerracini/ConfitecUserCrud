import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Confitec';
  public loaderTemplate = this.loadingService.loadingTemplate;

  constructor(public loadingService: LoadingService) {
    this.loadingService.offLoading();
  }
}

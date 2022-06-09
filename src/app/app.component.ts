import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BC-UI';
  
  constructor(private translateService: TranslateService) {}
  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
  }
}

import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(public auth: AuthService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
  }

  switchLanguage(language: any): void {
    console.log(language.target.value);
    this.translate.use(language.target.value);
  }
}

import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LoginService } from '../../security/login/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentLanguage: string;
  isLoggedIn: boolean;

  constructor(private translate: TranslateService, private loginService: LoginService) {
    this.currentLanguage = localStorage.getItem('appLanguage') || 'es';
    this.translate.setDefaultLang(this.currentLanguage);
    this.isLoggedIn = this.loginService.isLoggedIn();
  }

  toggleLanguage(event: MatSlideToggleChange) {
    this.currentLanguage = event.checked ? 'es' : 'en';
    this.translate.use(this.currentLanguage);
    localStorage.setItem('appLanguage', this.currentLanguage);
  } 
  
}

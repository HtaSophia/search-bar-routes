import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private currentLanguage: 'pt' | 'en' = 'en';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  public onChangeLanguageButtonClick(): void {
    const newLanguage = this.currentLanguage === 'en' ? 'pt' : 'en';
    this.currentLanguage = newLanguage;
    this.translate.use(newLanguage);
  }
}

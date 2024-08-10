import { Component } from '@angular/core';
import { LanguageService } from './shared/services/language/language.service';
import { LanguageCodeEnum } from './shared/enums/language.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'money-portfolio';

  constructor(private languageService:LanguageService){
    this.initializeAppLanguage();
  }

  initializeAppLanguage(){
    const lang = LanguageCodeEnum.ENGLISH;
    const langStr = lang ? lang : LanguageCodeEnum.ENGLISH;
    this.languageService.initLanguageService(langStr);
  }
}

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(public transalate: TranslateService) {}

  initLanguageService(language = 'en'): void {
    this.transalate.setDefaultLang(language);
    this.transalate.use(language);
  }

  useSpecificLang(lang: string) {
    this.transalate.use(lang);
  }
}

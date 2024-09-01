import { Component } from '@angular/core';
import { LanguageService } from './shared/services/language/language.service';
import { LanguageCodeEnum } from './shared/enums/language.enum';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'money-portfolio';
  shouldShowNavbar = true;
  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {
    this.initializeAppLanguage();
    this.navRouter();
  }

  navRouter() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.shouldShowNavbar =
          event.url !== '/login' && event.url !== '/signup';
      });
  }

  initializeAppLanguage() {
    const lang = LanguageCodeEnum.ENGLISH;
    const langStr = lang ? lang : LanguageCodeEnum.ENGLISH;
    this.languageService.initLanguageService(langStr);
  }
}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language/language.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private languageService:LanguageService, private translate: TranslateService){}

  ngOnInit() {
    this.languageService.initLanguageService();
  }
}

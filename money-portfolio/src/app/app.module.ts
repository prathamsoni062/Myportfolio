import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './mycomponents/navbar/navbar.component';
import { DashboardComponent } from './mycomponents/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './mycomponents/home/home/home.component';
import { InvestmentComponent } from './mycomponents/investment/components/investment/investment.component';
import { ExpensesComponent } from './mycomponents/expenses/expenses/expenses.component';
import { ReportComponent } from './mycomponents/report/report/report.component';
import { GoalComponent } from './mycomponents/goal/goal/goal.component';
import { ContactComponent } from './mycomponents/contact/contact/contact.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginComponent } from './mycomponents/login/login/login.component';
import { SignUpComponent } from './mycomponents/signUp/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InvestmentPopupComponent } from './mycomponents/investment/components/investment-popup/investment-popup.component';
import { customInterceptor } from './mycomponents/dashboard/services/custom.interceptor';
import { AuthInterceptor } from './core/auth.interceptor';
import { ExpensesPopupComponent } from './mycomponents/expenses/expenses/expenses-popup/expenses-popup.component';

export function HttpLoaderFactory(http: HttpClient):TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
const components = [
  NavbarComponent,
  DashboardComponent,
  HomeComponent,
  ExpensesComponent,
  InvestmentComponent,
  ReportComponent,
  GoalComponent,
  ContactComponent,
  SignUpComponent,
  LoginComponent,
  InvestmentPopupComponent,
  ExpensesPopupComponent
];
@NgModule({
  declarations: [AppComponent, ...components, ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    SharedModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  providers: [provideHttpClient(withInterceptors([customInterceptor])),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true, // Ensures multiple interceptors can be applied
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}

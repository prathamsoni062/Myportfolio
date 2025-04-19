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
import { IncomeComponent } from './mycomponents/income/components/income/income.component';
import { AddIncomeComponent } from './mycomponents/income/components/add-income/add-income.component';

// 🔁 MSAL imports

import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}


const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export  function MSALInstanceFactory(): IPublicClientApplication {
  const msalInstance = new PublicClientApplication({
    auth: {
      clientId: "6550c63b-508a-46d8-bc25-e398e07e80dd",
      authority: "https://login.microsoftonline.com/consumers",
      redirectUri: "http://localhost/4000/home",
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      // storeAuthStateInCookie: isIE,
    },
    system:{
      loggerOptions:{
        piiLoggingEnabled: false,
      }
    }
  });

   msalInstance.initialize().catch((error)=>{
    console.error("Msal Initialization failed")
   }); // ✅ wait before use
  return msalInstance;
}


// MSAL Interceptor is required to request access tokens in order to access the protected resource (Graph)
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

// MSAL Guard is required to protect routes and require authentication before accessing protected routes
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    }
  };
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
  ExpensesPopupComponent,
  IncomeComponent
];

@NgModule({
  declarations: [AppComponent, ...components, AddIncomeComponent],
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

    // MSAL Configuration
    MsalModule
    
  ],
  providers: [
    provideHttpClient(withInterceptors([customInterceptor])),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

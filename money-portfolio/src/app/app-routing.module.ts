import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './mycomponents/dashboard/dashboard.component';
import { HomeComponent } from './mycomponents/home/home/home.component';
import { GoalComponent } from './mycomponents/goal/goal/goal.component';
import { ReportComponent } from './mycomponents/report/report/report.component';
import { ContactComponent } from './mycomponents/contact/contact/contact.component';
import { InvestmentComponent } from './mycomponents/investment/components/investment/investment.component';
import { ExpensesComponent } from './mycomponents/expenses/expenses/expenses.component';
import { LoginComponent } from './mycomponents/login/login/login.component';
import { SignUpComponent } from './mycomponents/signUp/sign-up/sign-up.component';
import { navbarGuard } from './navbar.guard';
import { IncomeComponent } from './mycomponents/income/components/income/income.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'home', component: HomeComponent, },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [navbarGuard],
  },
  {
    path: 'investment',
    component: InvestmentComponent,
    canActivate: [navbarGuard],
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
    canActivate: [navbarGuard],
  },
  { path: 'contact', component: ContactComponent, canActivate: [navbarGuard] },
  { path: 'report', component: ReportComponent, canActivate: [navbarGuard] },
  { path: 'goal', component: GoalComponent, canActivate: [navbarGuard] },
  { path: 'income', component: IncomeComponent, canActivate: [navbarGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/login' }, // Wildcard route for invalid paths
  // Add other routes here
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

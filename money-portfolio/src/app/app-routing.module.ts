import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './mycomponents/dashboard/dashboard.component';
import { HomeComponent } from './mycomponents/home/home/home.component';
import { GoalComponent } from './mycomponents/goal/goal/goal.component';
import { ReportComponent } from './mycomponents/report/report/report.component';
import { ContactComponent } from './mycomponents/contact/contact/contact.component';
import { InvestmentComponent } from './mycomponents/investment/investment/investment.component';
import { ExpensesComponent } from './mycomponents/expenses/expenses/expenses.component';
import { LoginComponent } from './mycomponents/login/login/login.component';
import { SignUpComponent } from './mycomponents/signUp/sign-up/sign-up.component';
import { navbarGuard } from './navbar.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent ,canActivate: [navbarGuard]},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'services', component: InvestmentComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'report', component: ReportComponent },
  { path: 'goal', component: GoalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/home' } // Wildcard route for invalid paths
  // Add other routes here
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

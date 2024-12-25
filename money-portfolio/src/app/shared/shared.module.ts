import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from '../agular-material/angular-material.module';
import { InputComponent } from './components/generic-input/input/input.component';
import { BtnComponent } from './components/generic-btn/btn/btn.component';
import { SanckbarComponent } from './components/sanckbar/sanckbar.component';
import { GenericCardComponent } from './components/generic-card/generic-card.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { GenericPieChartComponent } from './components/generic-pie-chart/generic-pie-chart.component';
import { StackedBarChartComponent } from './components/stacked-bar-chart/stacked-bar-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
const components = [
  InputComponent,
  BtnComponent,
  SanckbarComponent,
  GenericCardComponent,
  GenericTableComponent,
  GenericPieChartComponent,
  StackedBarChartComponent

] as const;

const directives = [

] as const;

const services = [

] as const;

const pipes = [

] as const;
@NgModule({
  declarations: [...components, ...directives, ...pipes, ],
  imports: [
    BrowserModule,
    TranslateModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    NgApexchartsModule
  ],
  providers: [...services],
  exports: [
    ...components,
    ...directives,
    ...pipes,
    TranslateModule,
    AngularMaterialModule

  ]
})
export class SharedModule { }

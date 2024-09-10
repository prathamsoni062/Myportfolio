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


const components = [
  InputComponent, 
  BtnComponent,
  
] as const;

const directives = [

] as const;

const services = [

] as const;

const pipes = [

] as const;
@NgModule({
  declarations: [...components,...directives,...pipes, SanckbarComponent],
  imports: [
    BrowserModule,
    TranslateModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
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
export class SharedModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CardComponent } from './components/card/card.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { DemoMaterialModule } from './material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from '../app/components/landing-page/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CardComponent,
    DetailsPageComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

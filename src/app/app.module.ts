import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PagesComponent } from './pages/pages.component';
import { BasicAuthHtppInterceptorService } from './services/basic-auth-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { NgxFullCalendarModule } from 'ngx-fullcalendar';
import { FullCalendarModule } from '@fullcalendar/angular';




@NgModule({
  declarations: [
    AppComponent,
    PagesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    NgxFullCalendarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClient } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [BrowserModule,
    RouterModule.forRoot{[]},
    HttpClient
  ],  // Do not declare standalone components here
  bootstrap: [AppComponent]              // Leave the bootstrap empty if using standalone
})
export class AppModule {}

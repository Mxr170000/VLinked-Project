import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InitialScreenComponent } from './initial-screen/initial-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { CreateAccountScreenComponent } from './create-account-screen/create-account-screen.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    InitialScreenComponent,
    LoginScreenComponent,
    CreateAccountScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

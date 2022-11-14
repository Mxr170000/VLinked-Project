import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InitialScreenComponent } from './initial-screen/initial-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { CreateAccountScreenComponent } from './create-account-screen/create-account-screen.component';
import { AppRoutingModule } from './app-routing.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { ResumeBuilderPg1Component } from './resume-builder-pg1/resume-builder-pg1.component';
import { ResumeBuilderPg2Component } from './resume-builder-pg2/resume-builder-pg2.component';
import { ResumeBuilderPg3Component } from './resume-builder-pg3/resume-builder-pg3.component';
import { ResumeBuilderPg4Component } from './resume-builder-pg4/resume-builder-pg4.component';
import { JobFinderComponent } from './job-finder/job-finder.component';
import { PdfViewerModule } from "ng2-pdf-viewer";
import { JobFinderPg1Component } from './job-finder-pg1/job-finder-pg1.component';



@NgModule({
  declarations: [
    AppComponent,
    InitialScreenComponent,
    LoginScreenComponent,
    CreateAccountScreenComponent,
    HomeScreenComponent,
    ResumeBuilderComponent,
    ResumeBuilderPg1Component,
    ResumeBuilderPg2Component,
    ResumeBuilderPg3Component,
    ResumeBuilderPg4Component,
    JobFinderComponent,
    JobFinderPg1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

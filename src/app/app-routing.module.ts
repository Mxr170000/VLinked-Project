import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { CreateAccountScreenComponent } from './create-account-screen/create-account-screen.component';
import { InitialScreenComponent } from './initial-screen/initial-screen.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component'
import { ResumeBuilderPg1Component } from './resume-builder-pg1/resume-builder-pg1.component';
import { ResumeBuilderPg2Component } from './resume-builder-pg2/resume-builder-pg2.component';
import { ResumeBuilderPg3Component } from './resume-builder-pg3/resume-builder-pg3.component';
import { ResumeBuilderPg4Component } from './resume-builder-pg4/resume-builder-pg4.component';
import { JobFinderComponent } from './job-finder/job-finder.component';
import { JobFinderPg1Component } from './job-finder-pg1/job-finder-pg1.component';


const routes: Routes = [
  { path: '', component: InitialScreenComponent, pathMatch: 'full' },
  { path: 'login', component: LoginScreenComponent },
  { path: 'signup', component: CreateAccountScreenComponent },
  { path: 'home', component: HomeScreenComponent },
  { path: 'resume', component: ResumeBuilderComponent},
  { path: 'resume1', component:ResumeBuilderPg1Component},
  { path: 'resume2', component:ResumeBuilderPg2Component},
  { path: 'resume3', component:ResumeBuilderPg3Component},
  { path: 'resume4', component:ResumeBuilderPg4Component},
  { path: 'job1', component:JobFinderComponent},
  { path: 'job2', component:JobFinderPg1Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { CreateAccountScreenComponent } from './create-account-screen/create-account-screen.component';
import { InitialScreenComponent } from './initial-screen/initial-screen.component';
import { JobsearchScreenComponent} from './jobsearch-screen/jobsearch-screen.component'
const routes: Routes = [
  { path: '', component: InitialScreenComponent, pathMatch: 'full' },
  { path: 'login', component: LoginScreenComponent },
  { path: 'signup', component: CreateAccountScreenComponent },
  { path: 'jobsearch', component: JobsearchScreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
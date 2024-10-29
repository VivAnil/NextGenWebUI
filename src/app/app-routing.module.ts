import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OrganisationComponent } from './components/organisation/organisation.component';

const routes: Routes = [
  {
    path: '',
    component:LoginComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'organisation',
    component:OrganisationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OrganisationComponent } from './components/organisation/organisation.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [

  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: '',
    component:LayoutComponent,
    children:[
      {path: 'organisation', component: OrganisationComponent}
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OrganisationComponent } from './components/organisation/organisation.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProjectComponent } from './components/project/project.component';
import { ServicesComponent } from './components/services/services.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: '',
    component:LayoutComponent,
    children:[
      {path: 'project', component: ProjectComponent},
      {path: 'services', component: ServicesComponent},
      {path: 'processpayment', component: PaymentComponent}
    ]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'organisation',
    component: OrganisationComponent
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OrganisationComponent } from './components/organisation/organisation.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProjectComponent } from './components/project/project.component';
import { ServicesComponent } from './components/services/services.component';
import { HomeComponent } from './components/home/home.component';
import { UsermanagementComponent } from './components/usermanagement/usermanagement.component';
import { OrganisationadminComponent } from './components/organisationadmin/organisationadmin.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'organisation',
    component: OrganisationComponent
  },
  {
    path: '',
    component:LayoutComponent,
    children:[
      {path: 'project', component: ProjectComponent},
      {path: 'services', component: ServicesComponent},
      {path: 'home', component: HomeComponent},
      {path: 'services', component: ServicesComponent },
      {path: 'usermanagement',component: UsermanagementComponent},
      {path: 'organisationadmin',component: OrganisationadminComponent},
      {path: 'processpayment', component: PaymentComponent}
    ]
  },
  {path: 'organisationadmin',component: OrganisationadminComponent},
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

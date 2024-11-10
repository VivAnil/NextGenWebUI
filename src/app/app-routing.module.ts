import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OrganisationComponent } from './components/organisation/organisation.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProjectComponent } from './components/project/project.component';
import { ServicesComponent } from './components/services/services.component';
import { HomeComponent } from './components/home/home.component';

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
      {path: 'home', component: HomeComponent}
    ]
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

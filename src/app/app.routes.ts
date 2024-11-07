import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: '',
    component: LayoutComponent,
    children: [
      { path: 'organization', component: OrganizationComponent },
      { path: 'user', component: UserComponent },
      { path: 'home', component: HomeComponent}
    ]
    }
];

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
import { CompanyusermasterComponent } from './components/companyusermaster/companyusermaster.component';
import { EditadminComponent } from './components/editadmin/editadmin.component';
import { PaymentreportComponent } from './components/paymentreport/paymentreport.component';
import { EditcompanyComponent } from './components/editcompany/editcompany.component';
import { AllprojectsComponent } from './components/allprojects/allprojects.component';
import { AllbeneficiariesComponent } from './components/allbeneficiaries/allbeneficiaries.component';
import { SpbeneficiariesComponent } from './components/spbeneficiaries/spbeneficiaries.component';

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
      {path: 'organisationadmin/:id',component: OrganisationadminComponent,  runGuardsAndResolvers: 'always',},
      {path: 'processpayment', component: PaymentComponent},
      {path: 'companyusermaster', component: CompanyusermasterComponent},
      {path: 'editadmin', component: EditadminComponent},
      {path: 'editcompany', component: EditcompanyComponent},
      {path: 'paymentreport', component: PaymentreportComponent},
      {path: 'projectreport', component: AllprojectsComponent},
      {path: 'benReport', component: AllbeneficiariesComponent},
      {path: 'spwisereport', component: SpbeneficiariesComponent},
    ]
  },
      {path: 'project', component: ProjectComponent},
      {path: 'services', component: ServicesComponent},
      {path: 'home', component: HomeComponent},
      {path: 'services', component: ServicesComponent },
      {path: 'usermanagement',component: UsermanagementComponent},
      {path: 'organisationadmin',component: OrganisationadminComponent},
      {path: 'processpayment', component: PaymentComponent},
      {path: 'companyusermaster', component: CompanyusermasterComponent},
      {path: 'editadmin', component: EditadminComponent},
      {path: 'editcompany', component: EditcompanyComponent},
      {path: 'projectreport', component: AllprojectsComponent},
      {path: 'benReport', component: AllbeneficiariesComponent},
      {path: 'spwisereport', component: SpbeneficiariesComponent},
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

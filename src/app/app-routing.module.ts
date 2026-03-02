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
import { SpbeneficiariesComponent } from './components/spbeneficiaries/spbeneficiaries.component';
import { UsersComponent } from './components/users/users.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { BeneficiaryComponent } from './components/beneficiary/beneficiary.component';
import { TgtdashboardComponent } from './components/tgtdashboard/tgtdashboard.component';
import { BusinessproductComponent } from './components/businessproduct/businessproduct.component';
import { LBCReportComponent } from './components/lbcreport/lbcreport.component';
import { LbcbaComponent } from './components/lbcba/lbcba.component';
import { LbctrendComponent } from './components/lbctrend/lbctrend.component';
import { ProductreportComponent } from './components/productreport/productreport.component';
const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'organisation/:roleid',
    component: OrganisationComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'project', component: ProjectComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'home', component: HomeComponent },
      { path: 'usermanagement', component: UsermanagementComponent },
      { path: 'organisationadmin/:companyid/:roleid', component: OrganisationadminComponent, runGuardsAndResolvers: 'always', },
      { path: 'dashboard/:roleid', component: TgtdashboardComponent, runGuardsAndResolvers: 'always', },
      { path: 'processpayment', component: PaymentComponent },
      { path: 'companyusermaster', component: CompanyusermasterComponent },
      { path: 'editadmin', component: EditadminComponent },
      { path: 'editcompany', component: EditcompanyComponent },
      { path: 'paymentreport', component: PaymentreportComponent },
      { path: 'projectreport', component: AllprojectsComponent },
      { path: 'businessproduct', component: BusinessproductComponent },
      { path: 'bn/:companyid/:projectid/:soochnapreneurId', component: BeneficiaryComponent },
      { path: 'spwisereport', component: SpbeneficiariesComponent },
      { path: 'user/:companyid/:roleid', component: UsersComponent, runGuardsAndResolvers: 'always' },
      { path: 'businessproduct', component: BusinessproductComponent },
      { path: 'lbcreport', component: LBCReportComponent },
      { path: 'productreport', component: ProductreportComponent },
      { path: 'lbcba', component: LbcbaComponent },
      { path: 'lbctrend', component: LbctrendComponent }
    ]
  },
  { path: 'project', component: ProjectComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'usermanagement', component: UsermanagementComponent },
  { path: 'organisationadmin/:companyid/:roleid', component: OrganisationadminComponent, runGuardsAndResolvers: 'always', },
  { path: 'processpayment', component: PaymentComponent },
  { path: 'companyusermaster', component: CompanyusermasterComponent },
  { path: 'editadmin', component: EditadminComponent },
  { path: 'editcompany', component: EditcompanyComponent },
  { path: 'projectreport', component: AllprojectsComponent },
  { path: 'bn/:companyid/:projectid/:soochnapreneurId', component: BeneficiaryComponent },
  { path: 'spwisereport', component: SpbeneficiariesComponent },
  { path: 'user/:companyid/:roleid', component: UsersComponent, runGuardsAndResolvers: 'always' },
  { path: 'resetpassword', component: ResetpasswordComponent, runGuardsAndResolvers: 'always' },
  { path: 'businessproduct', component: BusinessproductComponent },
  { path: 'lbcreport', component: LBCReportComponent },
  { path: 'productreport', component: ProductreportComponent },
  { path: 'lbcba', component: LbcbaComponent },
  { path: 'lbctrend', component: LbctrendComponent },
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

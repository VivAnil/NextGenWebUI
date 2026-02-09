import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop'; 
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { TableModule } from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrganisationComponent } from './components/organisation/organisation.component';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
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
import { UsersComponent } from './components/users/users.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AuthService } from './services/auth.service';
import { BeneficiaryComponent } from './components/beneficiary/beneficiary.component';
import { TgtdashboardComponent } from './components/tgtdashboard/tgtdashboard.component';
import { BusinessproductComponent } from './components/businessproduct/businessproduct.component';
import { CustomRouteReuseStrategy } from './services/custom-route-reuse.strategy';
import { LBCReportComponent } from './components/lbcreport/lbcreport.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrganisationComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ProjectComponent,
    ServicesComponent,
    HomeComponent,
    UsermanagementComponent,
    OrganisationadminComponent,
    HomeComponent,
    PaymentComponent,
    CompanyusermasterComponent,
    EditadminComponent,
    PaymentreportComponent,
    EditcompanyComponent,
    AllprojectsComponent,
    UsersComponent,
    ResetpasswordComponent,
    BeneficiaryComponent,
    TgtdashboardComponent,
    BusinessproductComponent,
    LBCReportComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    TableModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    BrowserAnimationsModule,    
    DragDropModule,
    MatTabsModule,
    MatCardModule, 
    MatCheckboxModule, 
    FormsModule, 
    MatRadioModule,
    DialogModule,
    ProgressSpinnerModule, // Import ProgressSpinnerModule
    CheckboxModule
    
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

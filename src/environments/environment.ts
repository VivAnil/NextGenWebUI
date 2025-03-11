// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseAuthApiUrl: "https://motherappauthservice.azurewebsites.net/authenticate",
  baseServiceUrl: "https://motherappserviceapi.azurewebsites.net/api/Service/Get",
  baseSPUrl:"https://motherappserviceapi.azurewebsites.net/api/ServicePillar/Get",  
  baseRoleMasterApiUrl: "https://motherappserviceapi.azurewebsites.net/api/RoleMaster/Get",
  companyDashboardApiUrl : 'https://motherappcompanyapi.azurewebsites.net/api/Company/GetCompanyDashboard',
  benStatsApiUrl: 'https://motherappcompanyapi.azurewebsites.net/api/Project/GetBeneficiaryStats',
  companyUserRoleMasterBaseUrl:'https://motherappcompanyapi.azurewebsites.net/api/CompanyUserRoleMaster',
  userdetailsApiUrl:'https://motherappuserapi.azurewebsites.net/user/',
  resetPasswordUrl: 'https://motherappuserapi.azurewebsites.net/User/ResetPassword',
   baseCompanyUrl: "https://motherappcompanyapi.azurewebsites.net/api/"
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

export const environment = {
  production: true,
  baseAuthApiUrl: "https://motherappauthservice.azurewebsites.net/authenticate",
  baseServiceUrl: "https://motherappserviceapi.azurewebsites.net/api/Service/Get",
  baseSPUrl:"https://motherappserviceapi.azurewebsites.net/api/ServicePillar/Get",
  //baseSPUrl: "https://motherappserviceapi.azurewebsites.net/api/ServicePillar/Get",
  baseRoleMasterApiUrl: "https://motherappserviceapi.azurewebsites.net/api/RoleMaster/Get",
  // baseServicePillarUrl: "https://motherappserviceapi.azurewebsites.net/api/ServicePillar/Get"
   companyDashboardApiUrl : 'https://motherappcompanyapi.azurewebsites.net/api/Company/GetCompanyDashboard',
     benStatsApiUrl: 'https://motherappcompanyapi.azurewebsites.net/api/Project/GetBeneficiaryStats',
  companyUserRoleMasterBaseUrl:'https://motherappcompanyapi.azurewebsites.net/api/CompanyUserRoleMaster',
  userdetailsApiUrl:'https://motherappuserapi.azurewebsites.net/user/',
  baseCompanyUrl: "https://motherappcompanyapi.azurewebsites.net/api/",
  resetPasswordUrl: 'https://motherappuserapi.azurewebsites.net/User/ResetPassword',
  
};

export interface Permission {
    permissionId: number;
    permissionName: string;
    isAssigned: boolean;
  }
  
  export interface CompanyRole {
    companyId: number;
    companyRoleId: number;
    companyRoleName: string;
    systemRoleId: number;
    systemRoleName: string;
    permissionSettings: Permission[];
  }
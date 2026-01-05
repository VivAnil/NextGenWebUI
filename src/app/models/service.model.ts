export interface Service{
    id: number,
    serviceName: string,
    servicePillarId: number,
    servicePillarName: string,
    //Name: string,
    serviceRate: number,
    serviceWorth: number,
    status: boolean,
    singleTimeAvailability: boolean,
    spOnly: boolean,
    advanceFields: boolean,
    // ServicePillar: string
}

export interface SystemRole {
  Id: number,
  DisplayName: string
}

export interface SystemPermission {
  Id: number,
  ParentId: number,
  DisplayName: string
}

export interface ICustomRoleDefinition {
  companyId: number,
  companyRoleId: number,
  companyRoleName: string,
  systemRoleId: number,
  systemRoleName: string,
  permisionsAssigned: number[]
}

//export interface ICustomRolePermissions extends ICustomRoleDefinition {
//  permisionsAssigned: number[]; 
//}
export interface MasterData {
  id: number;
  name: string;
}

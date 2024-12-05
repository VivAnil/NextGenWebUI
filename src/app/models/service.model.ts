export interface Service{
    Id: number,
    // ServicePillarId: number,
    ServicePillarName: string,
    Name: string,
    ServiceRate: number,
    ServiceWorth: number,
    Status: boolean,
    SingleTimeAvailability: boolean,
    SpOnly: boolean,
    AdvanceFields: string,
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

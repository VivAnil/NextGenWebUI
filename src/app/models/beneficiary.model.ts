export interface Beneficiary {
  Id: number,
  ProfilePicture: string,
  FirstName:string,
  LasttName:string,
  FathersName:string,
  DOB:string,
  Sex:string,
  Mobile:string,
  Email:string,
  ProjectName:string,
  SPName:string,
  StateName:string,
  Districtame:string,
  BlockName:string,
  Village:string,
  GramPanchayat:string,
  PinCode:string,
  Address:string,
  PAN:string,
  Aadhar:string,
  }
  
  // Assuming that the User class is defined somewhere like this:
  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }
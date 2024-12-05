export interface Beneficiary {
    id: number;
    firstName: string;
    lastName: string;
    fathersName: string;
    husbandsName: string;
    dob: string;  // Use string for DOB; can be later parsed as Date
    idProof: number;
    idDetails: string;
    state: number;
    district: number;
    sex: number;
  
    // Age is a computed property, so we exclude it here from the model.
    age?: number;
  
    religion: number;
    socio: number;
    occupation: number;
    maritalStatus: number;
    category: number;
    department: number;
    empStatus: number;
    vulGroup: number;
    annualIncome: number;
    disability: number;
    soochnaPreneur: User;  // Assuming User is another model
    relationship?: number;
    sickness: string;
    percentageDisability: string;
    address: string;
    email: string;
    phone: string;
    qualification?: number;
    dateOfRegistration: number;
    blockId: number;
    villageId: number;
    panchayatId: number;
  }
  
  // Assuming that the User class is defined somewhere like this:
  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }
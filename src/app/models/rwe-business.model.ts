export interface RWEBusinessType {
    id: number;
    name: string;
    description: string;
    enabled: boolean;
}

export interface RWEBusinessSubCatType {
    id: number;
    name: string;
    description: string;
    enabled: boolean;
    businessTypeId: number;
    businessCategory?: string;
}

export interface RWEServiceOrProduct {
    id: number;
    name: string;
    enabled: boolean;
    businessTypeId: number;
    businessSubCatId: number;
    businessCategory?: string;
    businessSubCategory?: string;
    sellingPrice: number;
    margin: number;
    unit: string;
}

export interface RWEBusinessFilters {
    rweBusinessType: RWEBusinessType[];
    rweBusinessSubCatType: RWEBusinessSubCatType[];
    rweServiceOrProduct: RWEServiceOrProduct[];
}
export interface tgtBusiness {
    rweBusinessId: number;
    rweId: number;
    businessTypeId: number;
    businessSubCatTypeId: number;
    serviceOrProductId: number;
    inventory: number;
    inventoryUnit: string;
    startMonth: number;
    startYear: number;
    totalInvestment: number;
    selfInvestment: number;
    projectLoan: number;
    bankLoan: number;
    collectiveLoan: number;
    currentInventory: number;
    businessName: string;
    userType: string;
}

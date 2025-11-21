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

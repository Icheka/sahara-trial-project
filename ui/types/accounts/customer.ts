export type FamilyHistoryType = {
    cardiovascular?: string;
    colorectalCancer?: string;
    gerd?: string;
    ibd?: string;
    nash?: string;
    t2dm?: string;
};

export enum Gender {
    male = 'male',
    female = 'female',
    preferNotToSay = 'prefer not to say',
}

export enum SupportedEthnicities {
    westAfrica = 'west african',
    northAfrica = 'north africa',
    eastAfrica = 'east africa',
    southAfrica = 'south africa',
    centralAfrica = 'central africa',
}

export type CustomerType = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    country: string;
    gender: Gender;
    dob: number;
    ethnicity: SupportedEthnicities;
    height: number;
    weight: number;
    familyHistory: FamilyHistoryType;
};

export type CustomerLoginPayload = {
    email: string;
    password: string;
};

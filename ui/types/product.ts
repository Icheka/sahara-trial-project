import { CustomerType } from './accounts';

export type WellBeingType = {
    memoryLoss?: string;
    depression?: string;
    stress?: string;
    exercise?: string;
    tachycardia?: string;
    cramps?: string;
    shortnessOfBreat?: string;
    lethargy?: string;
};

export type DietType = {
    fruits?: string;
    nonStarchVegetables?: string;
    alcohol?: string;
    fattyFish?: string;
    legumes?: string;
    redMeat?: string;
    wholeGrains?: string;
};

export type OnGoingMedicationType = {
    antibiotics?: string;
    probiotics?: string;
};

export type RecentConditionsType = {
    acidReflux?: string;
    bloating?: string;
    earlySatiety?: string;
    gastricPain?: string;
    regurgitation?: string;
    stooling?: string;
};

export type ProductType = {
    _id: string;
    isActivated: boolean;
    activationCode: string;
    user: string | CustomerType;
    onGoingMedication: OnGoingMedicationType;
    smoker: string;
    recentConditions: RecentConditionsType;
    diet: DietType;
    wellBeing: WellBeingType;
};

export type ActivateProductPayload = {
    activationCode: string;
    onGoingMedication: OnGoingMedicationType;
    smoker: string;
    recentConditions: RecentConditionsType;
    diet: DietType;
    wellBeing: WellBeingType;
};

import { DietType, OnGoingMedicationType, RecentConditionsType, WellBeingType } from "types/models/products";

export type ActivateProductPayload = {
    userId: string;

    activationCode: string;
    onGoingMedication: OnGoingMedicationType;
    smoker: string;
    recentConditions: RecentConditionsType;
    diet: DietType;
    wellBeing: WellBeingType;
};

export type NewProductPayload = {
    code: string;
};

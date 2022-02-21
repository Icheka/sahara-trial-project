import { model, Schema } from "mongoose";
import { DietType, OnGoingMedicationType, ProductType, RecentConditionsType, WellBeingType } from "../types/models/products";

const wellBeing = new Schema<WellBeingType>({
    memoryLoss: {
        type: String,
        required: false,
    },
    depression: {
        type: String,
        required: false,
    },
    shortnessOfBreat: {
        type: String,
        required: false,
    },
    cramps: {
        type: String,
        required: false,
    },
    exercise: {
        type: String,
        required: false,
    },
    lethargy: {
        type: String,
        required: false,
    },
    stress: {
        type: String,
        required: false,
    },
    tachycardia: {
        type: String,
        required: false,
    },
});

const diet = new Schema<DietType>({
    fruits: {
        type: String,
        required: false,
    },
    nonStarchVegetables: {
        type: String,
        required: false,
    },
    alcohol: {
        type: String,
        required: false,
    },
    fattyFish: {
        type: String,
        required: false,
    },

    legumes: {
        type: String,
        required: false,
    },
    redMeat: {
        type: String,
        required: false,
    },
    wholeGrains: {
        type: String,
        required: false,
    },
});

const onGoingMedication = new Schema<OnGoingMedicationType>({
    antibiotics: {
        type: String,
        required: false,
    },
    probiotics: {
        type: String,
        required: false,
    },
});

const recentConditions = new Schema<RecentConditionsType>({
    acidReflux: {
        type: String,
        required: false,
    },
    bloating: {
        type: String,
        required: false,
    },
    earlySatiety: {
        type: String,
        required: false,
    },
    gastricPain: {
        type: String,
        required: false,
    },
    regurgitation: {
        type: String,
        required: false,
    },
    stooling: {
        type: String,
        required: false,
    },
});

const schema = new Schema<ProductType>(
    {
        isActivated: {
            type: Boolean,
            default: false,
            index: true,
        },
        activationCode: {
            type: String,
            required: [true, "An activation code!"],
        },
        user: {
            type: String,
            required: false,
        },
        onGoingMedication: onGoingMedication,
        smoker: {
            type: String,
            required: false,
        },
        recentConditions: recentConditions,
        diet: {
            type: String,
            required: false,
        },
        wellBeing: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export default model("Products", schema);

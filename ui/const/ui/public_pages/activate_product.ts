import * as Yup from 'yup';
import { yupRequiredString, yupString } from '../formik';

export const coloneeActivationCode = {
    label: 'ACT-',
    pattern: /^(ACT\-)/,
};

export const activateProductForm = {
    validations: Yup.object({
        activationCode: yupRequiredString.matches(
            coloneeActivationCode.pattern,
            'Activation code starts with ACT-'
        ),
        onGoingMedication: Yup.object({
            antibiotics: yupString,
            probiotics: yupString,
        }),
        smoker: yupRequiredString,
        recentConditions: Yup.object({
            acidReflux: yupRequiredString,
            bloating: yupRequiredString,
            earlySatiety: yupRequiredString,
            gastricPain: yupRequiredString,
            regurgitation: yupRequiredString,
            stooling: yupRequiredString,
        }).required(),
        diet: Yup.object({
            fruits: yupRequiredString,
            nonStarchVegetables: yupRequiredString,
            alcohol: yupRequiredString,
            fattyFish: yupRequiredString,
            legumes: yupRequiredString,
            redMeat: yupRequiredString,
            wholeGrains: yupRequiredString,
        }),
        wellBeing: Yup.object({
            memoryLoss: yupRequiredString,
            depression: yupRequiredString,
            stress: yupRequiredString,
            exercise: yupRequiredString,
            tachycardia: yupRequiredString,
            cramps: yupRequiredString,
            shortnessOfBreat: yupRequiredString,
            lethargy: yupRequiredString,
        }),
    }),
};

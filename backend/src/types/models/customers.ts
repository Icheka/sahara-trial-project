export enum SubjectiveAnswers {
    yes = "yes",
    no = "no",
    notSure = "I'm not sure",
}

export type FamilyHistoryType = {
    cardiovascular?: string;
    colorectalCancer?: string;
    gerd?: string;
    ibd?: string;
    nash?: string;
    t2dm?: string;
};

export enum Gender {
    male = "male",
    female = "female",
    preferNotToSay = "prefer not to say",
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
    ethnicity: string;
    height: number;
    weight: number;
    familyHistory: FamilyHistoryType;
};

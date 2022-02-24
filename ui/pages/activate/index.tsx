import { FunctionComponent, SyntheticEvent, useContext, useState } from 'react';

import { NextPage } from 'next';

import { Formik, FormikHelpers, FormikProps } from 'formik';
import { toast } from 'react-toastify';
import capitalize from 'capitalize';

import { Page, SecureCustomerPage } from 'components/layout';
import { activateProductForm, coloneeActivationCode } from 'const';
import { AuthContext } from 'context';
import { CustomerService } from 'services';
import { ButtonSubmit, FormBlock, Select, TextFieldLabelText } from 'components/base';
import { routes } from 'config';
import { SubjectiveAnswers, ActivateProductPayload } from 'types';
import { useRouter } from 'next/router';
import { FormSectionHeader } from 'components/base/Block/SectionHeader';
import { InputField } from 'components/base/TextInput/InputField';
import { useEffect } from 'react';

const ActivateProductPage: NextPage = () => {
    return (
        <Page usePublicNav>
            <SecureCustomerPage
                children={
                    <div className={``}>
                        <View />
                    </div>
                }
            />
        </Page>
    );
};

const View: FunctionComponent = () => {
    // vars
    const authContext = useContext(AuthContext);
    const initialValues: ActivateProductPayload = {
        activationCode: '',
        onGoingMedication: {
            antibiotics: '',
            probiotics: '',
        },
        smoker: '',
        recentConditions: {
            acidReflux: 'yes',
            bloating: 'yes',
            earlySatiety: 'yes',
            gastricPain: 'yes',
            regurgitation: 'yes',
            stooling: 'yes',
        },
        diet: {
            alcohol: 'yes',
            fattyFish: 'yes',
            fruits: 'yes',
            legumes: 'yes',
            nonStarchVegetables: 'yes',
            redMeat: 'yes',
            wholeGrains: 'yes',
        },
        wellBeing: {
            cramps: 'yes',
            depression: 'yes',
            exercise: 'yes',
            lethargy: 'yes',
            memoryLoss: 'yes',
            shortnessOfBreat: 'yes',
            stress: 'yes',
            tachycardia: 'yes',
        },
    };
    const finalStep = 6;
    let formikConstant: FormikProps<ActivateProductPayload>;
    const router = useRouter();

    // state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);

    // utils
    const shouldSubmit = () => step === finalStep;
    const blockValidation = (block: number): boolean => {
        const f = formikConstant;
        f.validateForm();
        let errors;
        let e;

        switch (block) {
            case 1:
                errors = false;
                break;
            case 2:
                errors = f.errors['activationCode'];
                break;
            case 3:
                errors =
                    f.errors.onGoingMedication?.antibiotics ||
                    f.errors.onGoingMedication?.probiotics ||
                    f.errors.smoker;
                break;
            case 4:
                e = f.errors.recentConditions;
                if (!e) errors = e;
                else
                    errors = Object.entries(e as Record<string, any>).find(
                        ([k, v]) => v === undefined
                    );
                break;
            case 5:
                e = f.errors.diet;
                if (!e) errors = e;
                else
                    errors = Object.entries(e as Record<string, any>).find(
                        ([k, v]) => v === undefined
                    );
                break;
            case 6:
                e = f.errors.wellBeing;
                if (!e) errors = e;
                else
                    errors = Object.entries(e as Record<string, any>).find(
                        ([k, v]) => v === undefined
                    );
                break;

            default:
                // setting errors to true because we'll be returning !!!errors
                errors = true;
        }
        f.setErrors({});
        return !!!errors;
    };
    const handleSubmit: (
        values: ActivateProductPayload,
        formikHelpers: FormikHelpers<ActivateProductPayload>
    ) => void | Promise<any> = async (values, { setSubmitting }) => {
        setIsSubmitting(true);

        if (step < finalStep) return setIsSubmitting(false);

        const [status, data] = await CustomerService.activateProduct(values);
        setStep(1);
        if (status !== 0) {
            setSubmitting(false);
            setIsSubmitting(false);
            return toast.error(data);
        }

        toast(
            <div>
                <h2 className={`font-bold text-indigo-400`}>Great!</h2>
                <p className={``}>Your Colonee kit has been activated successfully!</p>
            </div>
        );
        setTimeout(() => {
            router.push(routes.public.homepage);
        }, 4000);

        setSubmitting(false);
        setIsSubmitting(false);
    };

    // hooks
    useEffect(() => {
        // handle QR codes
        const url = new URL(window.location.href);
        const { searchParams } = url;
        const code = searchParams.get('activation-code');

        if (code === null) return;

        if (!code.match(coloneeActivationCode.pattern)) return;

        formikConstant.setFieldValue('activationCode', code);
        setStep(3);
    }, []);

    // jsx
    const SubmitButton: FunctionComponent = () => {
        // vars
        const submit = step === finalStep - 1;

        // utils
        const shouldNext = () => {
            return !submit ? blockValidation(step) : true;
        };
        const handleClick = () => {
            if (!shouldNext()) return;

            if (step < finalStep) setStep(step + 1);
            else formikConstant.submitForm();
        };

        return (
            <div>
                <button
                    type={'button'}
                    className="w-full flex justify-center items-center h-10 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isSubmitting}
                    onClick={handleClick}
                >
                    {isSubmitting ? <ButtonSubmit /> : step < finalStep ? 'Next' : 'Finish'}
                </button>
            </div>
        );
    };
    const Block: FunctionComponent<{ target: number; label?: string }> = (props) => (
        <FormBlock {...props} step={step} />
    );
    const BackButton: FunctionComponent = () =>
        step === 1 ? null : (
            <div className={`mt-4`}>
                <button
                    type={'button'}
                    className="w-full flex justify-center items-center h-10 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-300 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    disabled={isSubmitting}
                    onClick={() => setStep(step - 1)}
                >
                    Back
                </button>
            </div>
        );

    return (
        <>
            <div className="min-h-full py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Activate product
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={activateProductForm.validations}
                            onSubmit={handleSubmit}
                            onReset={(values, {}) => {}}
                        >
                            {(formik) => {
                                formikConstant = formik;
                                return (
                                    <form onSubmit={formik.handleSubmit}>
                                        <Block target={1}>
                                            <div>
                                                <h2
                                                    className={`text-3xl text-indigo-400 font-semibold text-center`}
                                                >
                                                    Welcome to Colonee!
                                                </h2>
                                                <div
                                                    className={`text-center text-md text-gray-400 font-medium mt-4 mb-8`}
                                                >
                                                    <p>
                                                        Your health matters to us and we are
                                                        proud of you for taking this step on
                                                        your journey to well-being!
                                                    </p>
                                                    <p>
                                                        This questionnaire will guide you
                                                        through the activation process. It
                                                        should take approximately{' '}
                                                        <Highlight
                                                            className={`whitespace-nowrap`}
                                                        >
                                                            2 minutes
                                                        </Highlight>
                                                        . Click on the{' '}
                                                        <Highlight>Next</Highlight> button
                                                        to get started.
                                                    </p>
                                                </div>
                                            </div>
                                        </Block>

                                        <Block target={2}>
                                            <div>
                                                <InputField
                                                    formik={formik}
                                                    label={`Enter the activation code on the Colonee kit. It is labelled 'ACTIVATION CODE' and begins with the characters '${coloneeActivationCode.label}'`}
                                                    title={`activationCode`}
                                                    placeholder={
                                                        coloneeActivationCode.label
                                                    }
                                                />
                                                <div
                                                    className={`font-semibold text-sm mt-3 text-indigo-600 mb-4`}
                                                >
                                                    You can also scan the QR code found on
                                                    the kit with your smartphone camera or
                                                    QR code scanner
                                                </div>
                                            </div>
                                        </Block>

                                        <Block target={3}>
                                            <div>
                                                <FormSectionHeader text={`Medication`} />
                                                <InputField
                                                    formik={formik}
                                                    label={`Are you currently on any antibiotics? Have you been on any during the last 2 weeks? Leave blank if there are none.`}
                                                    title={`onGoingMedication.antibiotics`}
                                                    error={
                                                        formik.errors.onGoingMedication
                                                            ?.antibiotics
                                                    }
                                                />
                                                <InputField
                                                    formik={formik}
                                                    label={`Are you currently on any probiotics? Have you been on any during the last 2 weeks? Leave blank if there are none.`}
                                                    title={`onGoingMedication.probiotics`}
                                                    error={
                                                        formik.errors.onGoingMedication
                                                            ?.probiotics
                                                    }
                                                />

                                                <TextFieldLabelText className={`mt-1`}>
                                                    Have you smoked any cigerattes during
                                                    the last 2 weeks?
                                                </TextFieldLabelText>
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'smoker',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    error={formik.errors.smoker}
                                                    callOnChangeOnMount
                                                />
                                            </div>
                                        </Block>

                                        <Block target={4}>
                                            <div>
                                                <FormSectionHeader
                                                    text={`Recent Conditions`}
                                                />
                                                <TextFieldLabelText>
                                                    Have you experience any of the following
                                                    at any time within the last 2 weeks?
                                                </TextFieldLabelText>
                                                <InputField label={`Acid reflux`}>
                                                    <Select
                                                        items={Object.values(
                                                            SubjectiveAnswers
                                                        ).map((a) => ({
                                                            label: capitalize(a),
                                                            value: a,
                                                        }))}
                                                        onSelect={(i: number) =>
                                                            formik.setFieldValue(
                                                                'recentConditions.acidReflux',
                                                                Object.values(
                                                                    SubjectiveAnswers
                                                                )[i]
                                                            )
                                                        }
                                                        error={
                                                            formik.errors.recentConditions
                                                                ?.acidReflux
                                                        }
                                                        callOnChangeOnMount
                                                    />
                                                </InputField>
                                                <InputField label={`Bloating`}>
                                                    <Select
                                                        items={Object.values(
                                                            SubjectiveAnswers
                                                        ).map((a) => ({
                                                            label: capitalize(a),
                                                            value: a,
                                                        }))}
                                                        onSelect={(i: number) =>
                                                            formik.setFieldValue(
                                                                'recentConditions.bloating',
                                                                Object.values(
                                                                    SubjectiveAnswers
                                                                )[i]
                                                            )
                                                        }
                                                        error={
                                                            formik.errors.recentConditions
                                                                ?.bloating
                                                        }
                                                        callOnChangeOnMount
                                                    />
                                                </InputField>
                                                <InputField
                                                    label={`Early satiety (i.e satiation much earlier in a meal than usual)?`}
                                                >
                                                    <Select
                                                        items={Object.values(
                                                            SubjectiveAnswers
                                                        ).map((a) => ({
                                                            label: capitalize(a),
                                                            value: a,
                                                        }))}
                                                        onSelect={(i: number) =>
                                                            formik.setFieldValue(
                                                                'recentConditions.earlySatiety',
                                                                Object.values(
                                                                    SubjectiveAnswers
                                                                )[i]
                                                            )
                                                        }
                                                        error={
                                                            formik.errors.recentConditions
                                                                ?.earlySatiety
                                                        }
                                                        callOnChangeOnMount
                                                    />
                                                </InputField>
                                                <InputField
                                                    label={`Gastric pain/stomache ache`}
                                                >
                                                    <Select
                                                        items={Object.values(
                                                            SubjectiveAnswers
                                                        ).map((a) => ({
                                                            label: capitalize(a),
                                                            value: a,
                                                        }))}
                                                        onSelect={(i: number) =>
                                                            formik.setFieldValue(
                                                                'recentConditions.gastricPain',
                                                                Object.values(
                                                                    SubjectiveAnswers
                                                                )[i]
                                                            )
                                                        }
                                                        error={
                                                            formik.errors.recentConditions
                                                                ?.gastricPain
                                                        }
                                                        callOnChangeOnMount
                                                    />
                                                </InputField>
                                                <InputField
                                                    label={`Regurgitation (i.e vomiting after eating)?`}
                                                >
                                                    <Select
                                                        items={Object.values(
                                                            SubjectiveAnswers
                                                        ).map((a) => ({
                                                            label: capitalize(a),
                                                            value: a,
                                                        }))}
                                                        onSelect={(i: number) =>
                                                            formik.setFieldValue(
                                                                'recentConditions.regurgitation',
                                                                Object.values(
                                                                    SubjectiveAnswers
                                                                )[i]
                                                            )
                                                        }
                                                        error={
                                                            formik.errors.recentConditions
                                                                ?.regurgitation
                                                        }
                                                        callOnChangeOnMount
                                                    />
                                                </InputField>
                                                <InputField label={`Diarrhoea/stooling`}>
                                                    <Select
                                                        items={Object.values(
                                                            SubjectiveAnswers
                                                        ).map((a) => ({
                                                            label: capitalize(a),
                                                            value: a,
                                                        }))}
                                                        onSelect={(i: number) =>
                                                            formik.setFieldValue(
                                                                'recentConditions.stooling',
                                                                Object.values(
                                                                    SubjectiveAnswers
                                                                )[i]
                                                            )
                                                        }
                                                        error={
                                                            formik.errors.recentConditions
                                                                ?.stooling
                                                        }
                                                        callOnChangeOnMount
                                                    />
                                                </InputField>
                                            </div>
                                        </Block>

                                        <Block target={5}>
                                            <FormSectionHeader text={`Diet`} />
                                            <InputField
                                                label={`Have you consumed any of the following at any time during the last 2 weeks?`}
                                            >
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'diet.fruits',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    label={`Fruits`}
                                                    error={formik.errors.diet?.fruits}
                                                    callOnChangeOnMount
                                                />
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'diet.nonStarchVegetables',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    label={`Non-starch vegetables (e.g leafy vegetables)`}
                                                    error={
                                                        formik.errors.diet
                                                            ?.nonStarchVegetables
                                                    }
                                                    callOnChangeOnMount
                                                />
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'diet.alcohol',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    label={`Alcohol`}
                                                    error={formik.errors.diet?.alcohol}
                                                    callOnChangeOnMount
                                                />
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'diet.fattyFish',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    label={`Fatty Fish`}
                                                    error={formik.errors.diet?.fattyFish}
                                                    callOnChangeOnMount
                                                />
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'diet.legumes',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    label={`Legumes`}
                                                    error={formik.errors.diet?.legumes}
                                                    callOnChangeOnMount
                                                />
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'diet.redMeat',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    label={`Red meat (e.g beef, pork, mutton)`}
                                                    error={formik.errors.diet?.redMeat}
                                                    callOnChangeOnMount
                                                />
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'diet.wholeGrains',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    label={`Whole grains`}
                                                    error={formik.errors.diet?.wholeGrains}
                                                    callOnChangeOnMount
                                                />
                                            </InputField>
                                        </Block>

                                        <Block target={6} label={'Wellness'}>
                                            <InputField
                                                label={`Have you experienced any of the following at any time during the last 2 weeks?`}
                                            >
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'wellBeing.memoryLoss',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    label={`Memory loss`}
                                                    error={
                                                        formik.errors.wellBeing?.memoryLoss
                                                    }
                                                    callOnChangeOnMount
                                                />
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'wellBeing.depression',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    label={`Depression`}
                                                    error={
                                                        formik.errors.wellBeing?.depression
                                                    }
                                                    callOnChangeOnMount
                                                />
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'wellBeing.stress',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    label={`Stress`}
                                                    error={formik.errors.wellBeing?.stress}
                                                    callOnChangeOnMount
                                                />
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'wellBeing.exercise',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    label={`Exercise`}
                                                    error={
                                                        formik.errors.wellBeing?.exercise
                                                    }
                                                    callOnChangeOnMount
                                                />
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'wellBeing.tachycardia',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    label={`Tachycardia (i.e abnormally high heart rate/fast heart beat)`}
                                                    error={
                                                        formik.errors.wellBeing?.tachycardia
                                                    }
                                                    callOnChangeOnMount
                                                />
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'wellBeing.cramps',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    label={`Muscle cramps, spasms, or unusual fatigue`}
                                                    error={formik.errors.wellBeing?.cramps}
                                                    callOnChangeOnMount
                                                />
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'wellBeing.shortnessOfBreat',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    label={`Shortness of breath`}
                                                    error={
                                                        formik.errors.wellBeing
                                                            ?.shortnessOfBreat
                                                    }
                                                    callOnChangeOnMount
                                                />
                                                <Select
                                                    items={Object.values(
                                                        SubjectiveAnswers
                                                    ).map((a) => ({
                                                        label: capitalize(a),
                                                        value: a,
                                                    }))}
                                                    onSelect={(i: number) =>
                                                        formik.setFieldValue(
                                                            'wellBeing.lethargy',
                                                            Object.values(
                                                                SubjectiveAnswers
                                                            )[i]
                                                        )
                                                    }
                                                    label={`Lethargy`}
                                                    error={
                                                        formik.errors.wellBeing?.lethargy
                                                    }
                                                    callOnChangeOnMount
                                                />
                                            </InputField>
                                        </Block>

                                        <div className={`mt-8`}>
                                            <SubmitButton />
                                            <BackButton />
                                        </div>
                                    </form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

const Highlight: FunctionComponent<{ className?: string }> = ({ children, className }) => (
    <span className={`text-indigo-500 font-semibold ${className}`}>{children}</span>
);

export default ActivateProductPage;
